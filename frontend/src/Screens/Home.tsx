import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "@/Store/Store";
import { Home_Card as Card, Sidebar } from "@/Components/Components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const getAllPosts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/post/allposts",
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
interface PostData {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  postImages?: string[];
  postVideo?: string[];
  upvotes: number;
  comments: number;
  communityName: string;
  communityDescription: string;
  isJoined: boolean;
  isUpvoted: boolean;
  communityLogo?: string;
  communityid: string;
}
function Home() {
  const currUser = useSelector((state: RootState) => state.loginStatus.user);
  const [loading, setloading] = useState(true);
  const [data, setData] = useState<PostData[]>([]);
  const mode = useSelector((state: RootState) => state.theme.mode);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setloading(false);
      const postsFetched = await getAllPosts();
      
      setData(postsFetched);
      
    };
    fetchPosts();
  }),[];

  return (
    <div
      className={`${mode} h-screen w-screen dark:bg-black overflow-hidden z-0`}
    >
      <div className="relative top-32" style={{ height: "calc(100% - 36px)" }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={0}
            style={{ flexBasis: "20%", minWidth: "20%", maxWidth: "50%" }}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="w-full " style={{ height: "calc(100% - 90px)" }}>
              <ScrollArea className="h-full w-full overflow-y-auto   ">
                {
                data? data.map((post) => (
                  <div className="w-full flex items-center justify-center my-3">
                    
                    <Card
                      Communitiy_Name={post.communityName}
                      Image={post.postImages ? post.postImages : [""]}
                      video={post.postVideo}
                      Comments_Count={post.comments}
                      Content={post.content}
                      Upvote_Counts={post.upvotes}
                      isUpvoted={post.isUpvoted}
                      Joined={post.isJoined}
                      Description={post.communityDescription}
                      loading={loading}
                      communityLogo={post.communityLogo}
                      postid={post.id}
                      communityid={post.communityid}
                    />
                  </div>
                )):
                <div className="font-montserrat text-center text-4xl font-semibold dark:text-white">
                  NO POSTS 😞
                </div>
              }
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Home;
