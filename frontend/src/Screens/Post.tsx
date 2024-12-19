interface Comment {
  postId: string;
  content: string;
  createdAt: Date;
  user: {
      name: string;
      profilePicture: string;
      username: string;
  }
}
interface PostData {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  postImages?: string[];
  postVideo?: string;
  upvotes: number;
  comments: Comment[];
  commentsCount: number;
  communityName: string;
  communityDescription: string;
  isJoined: boolean;
  isUpvoted: boolean;
  communityLogo?: string;
  communityid: string;
}
import axios from "axios";
import {
  Home_Card as Card,
  Comment_Input as Inp,
  Comment as CommentBox,
} from "@/Components/Components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";

import type { RootState } from "@/Store/Store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";
function Post() {
const {post_id} = useParams<{post_id:string}>();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [data, setData] = useState<PostData | null >(null);
  const [loading, setLoading] = useState(true);
  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post/singlepost",{
        headers: {
          postid: post_id
        },
        withCredentials: true
      },)
      return response.data.data
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setData(data)
    }).then(()=> setLoading(false))
  },[post_id])

  return (
    <div
      className={`${mode} h-screen w-screen dark:bg-black overflow-hidden z-0`}
    >
      <div
        className="relative top-32 flex flex-col items-center"
        style={{ height: "calc(100% - 36px)" }}
      >
        <ScrollArea className="h-full w-full max-h-[84vh] overflow-auto flex flex-col items-center">
          <div className="w-2/3 flex flex-col items-center">
            <Card
              Communitiy_Name={data?.communityName || "Community Name"}
              communityLogo={data?.communityLogo || ""}
              Comments_Count={data?.commentsCount || 0}
              Content={data?.content || "Content"}
              Upvote_Counts={300}
              isUpvoted={data?.isUpvoted || false}
              Image={data?.postImages?.[0] || ""}
              Joined={data?.isJoined || false}
              Description={data?.communityDescription || "Description"}
              postid={data?.id || ""}
              communityid={data?.communityid || ""}
              loading={loading}

            />
          </div>
          <div className="w-2/3 flex flex-col items-center space-y-2">
            <Inp />
            
            {data?.comments.map((comment) => (
              <CommentBox 
                postId={comment.postId}
                content={comment.content}
                createdAt={comment.createdAt}
                user={comment.user}
              />
            ))}
          </div>
        
        </ScrollArea>
      </div>
    </div>
  );
}

export default Post;
