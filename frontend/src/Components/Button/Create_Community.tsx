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
  import { Option_Logo,DropDownSearch } from "@/Components/Components";

  
  interface FormData {
    title: string;
    description: string;
    img: string[];
  }
  
  function Create_Community() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
    const [images, setImages] = useState<string[]>([]);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
  
        if (images.length + newImages.length <= 10) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
  
          // Update form value with new images
          setValue("img", updatedImages);
        } else {
          alert("You can upload a maximum of 10 images.");
        }
      }
    };
  
    const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      // Perform form submission with the images
    };
  
    return (
      <div className="w-full h-5 flex justify-end">
        <Dialog>
          <DialogTrigger>
            <Button variant={"outline"}>
              <Option_Logo label="+" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Community </DialogTitle>
              <DialogDescription>
                <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                  {/* Title input */}
                  <Input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className="h-12 border rounded-sm p-2 placeholder:font-poppins"
                  />
                  {errors.title && <p className="text-red-500">Title is required</p>}
  
                  {/* Description input */}
                  <Textarea
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className="h-32 border rounded-sm p-2 mt-2 placeholder:font-poppins"
                  />
                  {errors.description && <p className="text-red-500">Description is required</p>}
  
                  {/* Image upload input */}
                  <h1 className="font-poppins font-semibold">Community Logo</h1>
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Single change handler
                    className="h-12 border rounded-sm p-2 mt-2"
                  />
  
                  {/* Display uploaded images */}
                  
                  <div className="flex flex-wrap mt-2">
                    {images.map((img, index) => (
                      <img key={index} src={img} alt={`Upload Preview ${index + 1}`} className="w-20 h-20 object-cover m-1 rounded" />
                    ))}
                  </div>
                    <DropDownSearch/>
  
                  {/* Submit button */}
                  <Button type="submit" variant={"ghost"} className="w-24 self-end mt-2">
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
  
  export default Create_Community;
  