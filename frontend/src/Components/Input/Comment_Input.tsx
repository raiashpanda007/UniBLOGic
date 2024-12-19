import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { Option_Logo } from "../Components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
interface CommentData {
  comment: string;
}

function InputWithButton() {
  const userLogo = useSelector((state: RootState) => state.loginStatus.user.profilePicture);
  const { register, handleSubmit, formState: { errors } } = useForm<CommentData>();
  const onSubmit: SubmitHandler<CommentData> = data => console.log(data);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-16 w-2/3 items-center justify-between">
      <div className="w-12 h-12 rounded-full border">
        {loading ? (
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img src={userLogo}
            className="w-12 h-12 rounded-full"
          />
        )}
      </div>
      <Textarea
        {...register("comment", { required: "Comment is required" })}
        className="w-3/4 placeholder:dark:text-white placeholder:font-montserrat dark:text-white font-poppins"
        placeholder="Add Comment"
      />
      {errors.comment && <span className="text-red-500">{errors.comment.message}</span>}
      <Button className="w-14" variant="ghost" type="submit" disabled={loading}>
        <Option_Logo label="Post" />
      </Button>
    </form>
  );
}

export default InputWithButton;
