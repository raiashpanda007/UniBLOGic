import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AttachFile, Clear } from "@/assets/Icons/Icons";
import { Option_Logo } from "../Components";
import Descriptions_Component from "../Drop Down/Description_Component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  userName: string;
  name: string;
  img: string;
}

interface Message {
  id: string;
  content: string;
  user: User;
  date: string;
  time: string;
  reply: {
    message: Message | null;
    reply: string;
  } | null;
  img: string | null;
}

interface MessageInputProps {
  isReplyVisible: boolean;
  setReplyVisibility: () => void;
  repliedMessage?: Message | null;
}

function MessageInput({
  repliedMessage,
  isReplyVisible,
  setReplyVisibility,
}: MessageInputProps) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Message>();
  const [img, setImg] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImg(result);
        setValue("img", result); // Manually set the form's img value
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Message> = (data) => {
    console.log(data);
    reset(); // Clear the form fields
    setImg(null); // Clear the image preview
    setReplyVisibility(); // Clear the reply visibility
  };

  return (
    <div className="w-full min-h-16 border absolute bottom-3 bg-white dark:bg-black">
      <div className="max-h-36 w-full bg-white border">
        {img && (
          <div className="pl-16 max-h-20 w-full border relative">
            <Button variant="ghost" className="absolute top-0 right-0" onClick={() => setImg(null)}>
              <Clear />
            </Button>
            <img src={img} alt="Preview" className="h-20 w-20 object-cover rounded-sm" />
          </div>
        )}

        {isReplyVisible && repliedMessage && (
          <div className="h-12 w-full flex items-center border bg-white space-x-2">
            <div className="h-8 px-2 font-semibold flex items-center bg-gray-200 rounded-sm opacity-50">
              <Option_Logo label={`${repliedMessage.user.userName} :`} />
            </div>
            <Descriptions_Component text={repliedMessage.content} />
            <Button variant="ghost" className="w-8 h-8" onClick={setReplyVisibility}>
              <Clear />
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="h-16 w-full border flex items-center justify-between">
        <Button variant="ghost" className="w-10 h-10 relative">
          <AttachFile />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </Button>
        <Input
          placeholder="Send messages ...."          
          {...register("content", { required: true })}
        />
        {errors.content && <p className="text-red-500">Message content is required</p>}
        
        <Button type="submit">
          <Option_Logo label="Send" />
        </Button>
      </form>
    </div>
  );
}

export default MessageInput;
