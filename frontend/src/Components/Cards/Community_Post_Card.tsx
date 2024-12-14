import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Upvote, Comment_Button, Share } from "@/Components/Components";
import Descriptions_Component from "../Drop Down/Description_Component";
interface Community_Post_CardProps {
  Content: string;
  Image: string;
  Upvote_Counts: number;
  Comments_Count: number;
  isUpvoted: boolean;
  onClick?: () => void;
}
function Community_Post_Card({
  Content,
  Image,
  Upvote_Counts,
  Comments_Count,
  isUpvoted,
  onClick,
}: Community_Post_CardProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <div className="w-2/3" >
      <div className="space-y-3 cursor-pointer"  >
        {loading ? (
          <Skeleton className="min-h-12 rounded-md" />
        ) : (
          <div className="min-h-12  ">
            <Descriptions_Component text={Content} />
          </div>
        )}

        {loading ? (
          <Skeleton className="h-80 rounded-sm" />
        ) : (
          Image != "" && (
            <div className="h-80 " onClick={onClick}>
              <img src={Image} alt="" className=" w-full h-full rounded-sm cursor-pointer" />
            </div>
          )
        )}
      </div>
      <div className="h-10 ">
        <div className="h-full w-1/2 flex items-center">
          <Upvote UpvoteCount={Upvote_Counts} Upvoted={isUpvoted} />
          <Comment_Button CommentCount={Comments_Count} />
          <Share />
        </div>
      </div>
    </div>
  );
}

export default Community_Post_Card;
