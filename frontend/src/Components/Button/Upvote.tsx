import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { UpvoteIcon } from "@/assets/Icons/Icons";
import type { RootState } from "../../Store/Store";
import { Option_Logo } from "../Components"; 


interface UpvoteProps {
  Upvoted: boolean;
  UpvoteCount: number;
}

function Upvote({ Upvoted, UpvoteCount }: UpvoteProps) {
  const iconSize = 28;
  const [upvoted, setUpvoted] = useState(Upvoted);
  const [upvoteCount, setUpvoteCount] = useState(UpvoteCount);
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Determine icon color based on theme and upvote state
  const iconColor = upvoted 
    ? (mode === 'light' ? '#1a75ff' : '#ff6bbd') // Light or dark theme upvoted color
    : (mode === 'light' ?'#000000':"#ffffff"); // Default color when not upvoted

  return (
    <div className="h-full w-16 flex items-center justify-around font-poppins">
      <Button
        variant="outline"
        style={{
          width: 26,
          height: 26,
        }}
        className="p-2 rounded-full"
        onClick={() => {
          setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
          setUpvoted(!upvoted);
        }}
      >
        <UpvoteIcon
          style={{
            fontSize: iconSize,
            color: iconColor,
          }}
        />
      </Button>
      {
        upvoteCount > 0?(
          <Option_Logo label={upvoteCount.toString()} />
        ):(
          <span className="space-x-2 text-xs font-poppins">{upvoteCount}</span>
        )
      }
    </div>
  );
}

export default Upvote;
