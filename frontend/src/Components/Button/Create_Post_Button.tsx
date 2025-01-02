import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "@/Components/Components";
import { useNavigate } from "react-router-dom";
import { setLoading,setLoadingMsg } from "@/Store/loading";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/Store/Store";
interface FormData {
  title: string;
  description: string;
  files: File[];
}

import axios from "axios";
import { useParams } from "react-router-dom";
const generateURLAndUpload = async (video: File) => {
  if (!video) return null;
  try {
    const response = await axios.post(
      "http://localhost:3000/api/post/uploadvideo",
      {
        key: video.name,
        type: video.type, // Use the correct MIME type (e.g., video/mp4)
      },
      { withCredentials: true }
    );

    if (response && response.data.data) {
      const { url, key } = response.data.data;
      if (!url || !key) {
        alert("Failed to upload video");
        return;
      }

      // Upload the file directly without wrapping it in FormData
      await axios.put(url, video, {
        headers: {
          "Content-Type": video.type, // Ensure this is the video's MIME type
          "Content-Length": video.size,
        },
      });

      return key;
    } else {
      alert("Failed to upload video");
    }
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};

function Create_Post_Button() {
  const navigate = useNavigate();
  const { communityid } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [uploads, setUploads] = useState<
    { type: "video" | "image"; url: string }[]
  >([]);

  const onSubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      let videoKey = null;
  
      // Step 1: Handle Video Upload
      if (data.files) {
        const videoFiles = data.files.filter((file) => file.type.startsWith("video/"));
        if (videoFiles.length > 0) {
          dispatch(setLoadingMsg("Uploading video..."));
          dispatch(setLoading(true));
          videoKey = await generateURLAndUpload(videoFiles[0]);
          if (!videoKey) {
            alert("Failed to upload video. Please try again.");
            return;
          }
          dispatch(setLoadingMsg("Video uploaded successfully. Processing..."));
        }
      }
  
      // Step 2: Poll for Video Processing Status
      if (videoKey) {
        const startTime = Date.now();
        const POLLING_INTERVAL = 60000; // 60 seconds
        const POLLING_TIMEOUT = 900000; // 15 minutes
  
        const checkVideoStatus = async () => {
          try {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > POLLING_TIMEOUT) {
              throw new Error("Video processing timed out.");
            }
  
            const response = await axios.post(
              "http://localhost:3000/api/post/videostatus",
              { key: videoKey },
              { withCredentials: true }
            );
  
            if (response.data.data.result === true) {
              dispatch(setLoading(false));
              return true; // Video is ready
            } else {
              dispatch(setLoadingMsg(response.data.data.video_status));
              return false; // Continue polling
            }
          } catch (error) {
            console.error("Error checking video status:", error);
            throw new Error("Error checking video status. Please try again.");
          }
        };
  
        // Polling Loop
        let isVideoReady = false;
        while (!isVideoReady) {
          isVideoReady = await checkVideoStatus();
          if (!isVideoReady) {
            await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
          }
        }
      }
  
      // Step 3: Submit the Form After Video is Ready
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (videoKey) formData.append("videoname", videoKey);
      if (communityid) formData.append("communityid", communityid);
  
      // Handle Image Uploads
      for (const file of uploads) {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const fileName = file.url.split("/").pop() || "uploaded_file";
        if (file.type === "image") {
          formData.append(
            "postimages",
            new File([blob], fileName, { type: blob.type })
          );
        }
      }
  
      // Final API Call to Submit Form
      dispatch(setLoadingMsg("Submitting your post..."));
      const response = await axios.post(
        "http://localhost:3000/api/post/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (response) {
        alert("Post created successfully!");
        navigate(`/home`);
      } else {
        throw new Error("Failed to create the post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert( "An unexpected error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingMsg(''));
    }
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: { type: "video" | "image"; url: string }[] = Array.from(
        files
      ).map((file) => {
        const url = URL.createObjectURL(file);
        const isVideo = file.type.startsWith("video/");
        return { type: isVideo ? "video" : "image", url };
      });

      if (uploads.length + newFiles.length <= 5) {
        setUploads((prevUploads) => [...prevUploads, ...newFiles]);
        setValue("files", Array.from(files));
      } else {
        alert("You can upload a maximum of 5 files (images or videos).");
      }
    }
  };

  const removeFile = (index: number) => {
    setUploads((prevUploads) => {
      // Clean up the URL blob for memory efficiency
      URL.revokeObjectURL(prevUploads[index].url);
      return prevUploads.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="w-full h-5 flex justify-end">
      <Dialog>
        <DialogTrigger >
          <Button variant={"outline"}>
            <Option_Logo label="Add a post" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Community Post</DialogTitle>
            <DialogDescription>
              <form
                className="flex flex-col w-full"
                onSubmit={handleSubmit(onSubmitForm)}
              >
                {/* Title input */}
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                  className="h-12 border rounded-sm p-2"
                />
                {errors.title && (
                  <p className="text-red-500">Title is required</p>
                )}

                {/* Description input */}
                <Textarea
                  placeholder="Description"
                  {...register("description", { required: true })}
                  className="h-32 border rounded-sm p-2 mt-2"
                />
                {errors.description && (
                  <p className="text-red-500">Description is required</p>
                )}

                {/* File upload input */}
                <Input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="h-12 border rounded-sm p-2 mt-2"
                />

                {/* Display uploaded files */}
                <div className="flex flex-wrap mt-2">
                  {uploads.map((file, index) => (
                    <div key={index} className="relative group w-20 h-20 m-1">
                      {/* Remove button */}
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        X
                      </button>
                      {/* Image or Video Preview */}
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={`Upload Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <video
                          src={file.url}
                          controls
                          className="w-full h-full object-cover rounded"
                        >
                          Your browser does not support this video format.
                        </video>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant={"ghost"}
                  className="w-24 self-end mt-2"
                >
                  <Option_Logo label="Post" />
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Create_Post_Button;
