interface CommentProps {
    comment: string;
    user: string;
    date: string;
    upvotes: number;
    isUpvoted: boolean;
  }
  
  import { useState, useEffect } from "react";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Option_Logo,Upvote } from "../Components";
  
  const Comment = ({ comment, user, date }: CommentProps) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }, []);
  
    return (
      <div className="min-h-20 w-2/3  flex space-x-2 ">
        {loading ? (
          <Skeleton className="w-16 h-16 rounded-full " />
        ) : (
          <div className="w-16 h-16 rounded-full border">
            <img src="/path-to-avatar" alt={`${user}'s avatar`} className="w-full h-full rounded-full" />
          </div>
        )}
        
        {loading ? (
          <Skeleton className="w-3/4 h-16 rounded-lg" />
        ) : (
          <div className=" rounded-lg border px-3 space-y-2" style={{width:'calc(100%)'}}>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Option_Logo label={user} />
                <h1 className="font-montserrat font-light text-sm dark:text-white">{date}</h1>
              </div>
              <p className="font-montserrat font-light text-sm dark:text-white">{comment}</p>
            </div>
            <div className="flex">
            <Upvote UpvoteCount={200} Upvoted={false} />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Comment;
  