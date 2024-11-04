interface Comment {
  id: string;
  user: {
    id: string;
    username: string;
    profile: {
      avatar: string;
    };
  };
  content: string;
  created_at: string;
}
interface Home_CardProps {
  Communitiy_Name: string;
  Description: string;
  Content: string;
  Image: string;
  Upvote_Counts: number;
  isUpvoted: boolean;
  Comments_Count: number;
  Comments: Comment[];
  Joined: boolean;
}

import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Ghost_Button,Upvote,Comment_Button,Share } from "../Components";
import Descriptions_Component from "../Drop Down/Description_Component";



function Home_Card({
  Communitiy_Name = "Community",
  Description = "Description",
  Image = "img",
  Upvote_Counts = 0,
  Comments_Count = 0,
  Comments = [],
  Joined = false,
  isUpvoted = false,
}: Home_CardProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <div className="w-2/3 border rounded ">
      <div className="w-full  flex justify-between items-center">
        <div className="w-2/3 h-16 flex items-center">
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <img
              src="img"
              className="h-12 w-12 rounded-full border dark:border-gray-600"
            />
          )}
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <div className="">
              <h1 className="text-xl font-semibold font-poppins dark:text-white ">
                {Communitiy_Name}
              </h1>
              <p className="text-sm font-light text-gray-500">{Description}</p>
            </div>
          )}
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <Ghost_Button Joined={Joined} />
        </div>
      </div>
      <div className="space-y-3">
        {loading ? (
          <Skeleton className="min-h-12 rounded-md" />
        ) : (
          <div className="min-h-12 border ">
            <Descriptions_Component text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium nemo non ipsa dolore corporis veniam fugiat nostrum alias reiciendis, voluptate voluptas deserunt eos minima harum repellendus expedita voluptatum modi sequi beatae architecto doloribus ipsum assumenda unde dicta? Facilis ratione asperiores quod! Placeat ab in molestiae odit aspernatur, corporis numquam nobis." />
          </div>
        )}

        {loading ? (
          <Skeleton className="h-96 rounded-sm" />
        ) : (
          <div className="h-96 border">
            <img src={Image} alt="" className="w-full h-full" />
          </div>
        )}
      </div>
      <div className="h-10 border">
        <div className="h-full w-1/2 flex items-center">
          <Upvote UpvoteCount={Upvote_Counts} Upvoted={isUpvoted} />
          <Comment_Button CommentCount={Comments_Count} />
          <Share/>
        </div>
        
      </div>
    </div>
  );
}

export default Home_Card;
