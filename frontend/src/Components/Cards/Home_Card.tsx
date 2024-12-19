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
  Image?: string;
  Upvote_Counts: number;
  isUpvoted: boolean;
  Comments_Count: number;
  Comments: Comment[];
  Joined: boolean;
  loading:boolean;
  communityLogo?:string;
  postid:string
  communityid:string
}

import { Skeleton } from "@/components/ui/skeleton";
import { Ghost_Button,Upvote,Comment_Button,Share } from "../Components";
import Descriptions_Component from "../Drop Down/Description_Component";



function Home_Card({
  Communitiy_Name = "Community",
  Description = "Description",
  Image ="" ,
  Upvote_Counts = 0,
  Comments_Count = 0,
  Joined = false,
  isUpvoted = false,
  Content = "",
  loading=false,
  communityLogo,
  postid,
  communityid,
}: Home_CardProps) {
  
  
  return (
    <div className="w-2/3 border rounded p-2">
      <div className="w-full  flex justify-between items-center">
        <div className="w-2/3 h-16 flex items-center">
          {loading ? (
            <Skeleton className="h-12 w-12 rounded-full" />
          ) : (
            <img
              src={communityLogo}
              className="h-12 w-12 rounded-full border "
            />
          )}
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <div className="">
              <h1 className="text-xl font-semibold font-montserrat dark:text-white ">
                {Communitiy_Name}
              </h1>
              <p className="text-sm font-light font-poppins text-gray-500"><Descriptions_Component text={Description} needShowmore={false} text_length={60}/></p>
            </div>
          )}
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <Ghost_Button Joined={Joined} communityid={communityid}/>
        </div>
      </div>
      <div className="space-y-3">
        {loading ? (
          <Skeleton className="min-h-12 rounded-md" />
        ) : (
          <div className="min-h-12  ">
            <Descriptions_Component text={Content} text_length={50} needShowmore={true}/>
          </div>
        )}

        {loading ? (
          <Skeleton className="h-96 rounded-sm" />
        ) : (
          Image!="" && <div className="h-96 ">
          <img src={Image} alt="" className=" w-full h-full rounded-sm" />
        </div>
        )}
      </div>
      <div className="h-10 ">
        <div className="h-full w-1/2 flex items-center">
          <Upvote UpvoteCount={Upvote_Counts} Upvoted={isUpvoted} postId ={postid} />
          <Comment_Button CommentCount={Comments_Count} />
          <Share/>
        </div>
        
      </div>
    </div>
  );
}

export default Home_Card;
