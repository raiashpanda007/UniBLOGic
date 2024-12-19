import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { UpvoteIcon } from "@/assets/Icons/Icons";
import type { RootState } from "../../Store/Store";
import { Option_Logo } from "../Components"; 

import axios from "axios";
interface UpvoteProps {
  Upvoted: boolean;
  UpvoteCount: number;
  postId:string
}


function Upvote({ Upvoted, UpvoteCount,postId }: UpvoteProps) {
  const upvotePost = async ()=>{
    try {
      const response = await axios.post("http://localhost:3000/api/post/upvote",{},{headers:{
        postid:postId
      },withCredentials:true});
      console.log(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }
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
        onClick={async () => {
          try {
            console.log(postId)
            setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
            await upvotePost();
            setUpvoted(!upvoted);
          } catch (error) {
            console.error("Failed to update upvote:", error);
            // Optionally, revert optimistic UI updates
            setUpvoteCount(upvoted ? upvoteCount + 1 : upvoteCount - 1);
          }
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
