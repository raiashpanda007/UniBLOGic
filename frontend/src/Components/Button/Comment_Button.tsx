import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Comment } from "@/assets/Icons/Icons";
import type { RootState } from "../../Store/Store";

interface CommentButtonProps {
  CommentCount: number;
}

function Comment_Button({ CommentCount }: CommentButtonProps) {
  const [commentCount, setCommentCount] = useState(CommentCount);
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Determine icon color based on theme
  const iconColor = mode === 'light' ? '#000000' : '#ffffff'; // Example colors for light and dark themes

  return (
    <div className="h-full w-16 flex items-center justify-around">
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
          setCommentCount(commentCount + 1);
        }}
      >
        <Comment
          style={{
            fontSize: 24,
            color: iconColor, // Set icon color based on theme
          }}
        />
      </Button>
      <span className="space-x-2 text-xs">{commentCount}</span>
    </div>
  );
}

export default Comment_Button;
