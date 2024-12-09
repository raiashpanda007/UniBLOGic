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
import { Option_Logo, DropDownSearch } from "@/Components/Components";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/Store";

// Define form data type
interface FormData {
  title: string;
  description: string;
  img: string[];
}

// Define user type
export type User = {
  id: string;
  profilePhoto: string;
  username: string;
  batch: number;
  branch: string;
};

function Create_Community() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const [images, setImages] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      if (images.length + newImages.length <= 10) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        setValue("img", updatedImages);
      } else {
        alert("You can upload a maximum of 10 images.");
      }
    }
  };

  // Handle user selection from DropDownSearch
  const handleSelectionChange = (users: User[]) => {
    setSelectedUsers(users);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Combine form data with selected users
    const communityData = {
      ...data, // Title, description, and images
      members: selectedUsers, // Selected users from DropDownSearch
    };
  
    console.log("Community Data:", communityData);
  
    // Perform API call or further processing
  };

  return (
    <div className={`${mode} w-full h-5 flex justify-end`}>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"}>
            <Option_Logo label="+" className="hover:bg-slate-500 text-3xl" />
          </Button>
        </DialogTrigger>
        <DialogContent className={`${mode} dark:bg-black dark:text-white`}>
          <DialogHeader>
            <DialogTitle className="font-poppins dark:text-white">Create Community</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* Title Input */}
                <Input
                  type="text"
                  placeholder="Title ..... "
                  {...register("title", { required: true })}
                  className="h-12 border rounded-sm p-2 placeholder:font-poppins dark:placeholder:text-white"
                />
                {errors.title && <p className="text-red-500">Title is required</p>}

                {/* Description Input */}
                <Textarea
                  placeholder="Description ...."
                  {...register("description", { required: true })}
                  className="h-32 border rounded-sm p-2 mt-2 placeholder:font-poppins dark:placeholder:text-white"
                />
                {errors.description && <p className="text-red-500">Description is required</p>}

                {/* Community Logo Upload */}
                <h1 className="font-poppins font-semibold">Community Logo</h1>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-12 border rounded-sm p-2 mt-2 font-poppins dark:text-white dark:placeholder:text-white"
                />

                {/* Display Uploaded Images */}
                <div className="flex flex-wrap mt-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Upload Preview ${index + 1}`}
                      className="w-20 h-20 object-cover m-1 rounded"
                    />
                  ))}
                </div>

                {/* User Selection Dropdown */}
                <DropDownSearch  />

                {/* Submit Button */}
                <Button type="submit" variant={"outline"} className="w-38 self-end mt-2">
                  <Option_Logo label="Create Community" />
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Create_Community;
