import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Comment } from "@/assets/Icons/Icons";
import type { RootState } from "../../Store/Store";
import { useParams } from "react-router-dom";
import { Option_Logo } from "../Components";
interface CommentButtonProps {
  CommentCount: number;
}

function Comment_Button({ CommentCount }: CommentButtonProps) {
  const [commentCount, setCommentCount] = useState(CommentCount);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const { post_id } = useParams<{ post_id: string }>();
  useEffect(() => {
    console.log(post_id);
  }, [post_id]);

  // Determine icon color based on theme
  const iconColor = post_id 
    ? (mode === 'light' ? '#1a75ff' : '#ff6bbd') // Light or dark theme upvoted color
    : (mode === 'light' ?'#000000':"#ffffff"); 

  return (
    <div className="h-full w-16 flex items-center justify-around dark:text-white ">
      <Button
        variant="ghost"
        style={{
          width: 26,
          height: 26,
          color: iconColor, // Set button text color based on theme
          borderColor: iconColor, // Set button border color based on theme
        }}
        className="p-2 rounded-full"
        onClick={() => {
            if(!post_id) setCommentCount(commentCount + 1);
        }}
      >
        <Comment
          style={{
            fontSize: 24,
            color: iconColor, // Set icon color based on theme
          }}
        />
      </Button>
      {
        post_id?(
            <Option_Logo label={CommentCount.toString()}/>
        ):(<span className="space-x-2 text-xs ">
            {CommentCount}
        </span>)
      }
    </div>
  );
}

export default Comment_Button;
