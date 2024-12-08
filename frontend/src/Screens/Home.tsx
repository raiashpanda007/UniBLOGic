import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "@/Store/Store";
import {
  Sidebar_Card as SideBar_Component,
  Home_Card as Card,
} from "@/Components/Components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const userDetails = useSelector((state: RootState) => state.loginStatus.user);
  const testItem = localStorage.getItem("testItem");
  console.log(testItem);

  const navigate = useNavigate();
  useEffect(()=>{
    console.log(userDetails);
  },[userDetails])

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
            <h1 className="fixed font-poppins px-3 font-bold text-2xl bg-white  dark:bg-black dark:text-white">
              Communities
            </h1>

            <div
              className="w-full py-3 relative top-10"
              style={{ height: "calc(100% - 90px)" }}
            >
              <div className="relative h-full">
                <ScrollArea className="h-full w-full overflow-y-auto pb-10">
                  <SideBar_Component
                    title="Pyc"
                    description="Coding Club"
                    img="https://d1ng1bucl7w66k.cloudfront.net/ghost-blog/2024/10/Screen-Shot-2024-10-22-at-11.33.25-AM.png"
                  />
                  <SideBar_Component
                    title="ML"
                    description="Machine Learning"
                    img="https://imgs.search.brave.com/_jkpq0a31YQNSyiu5BbPPBPUgChzU1ZvYUgtfGzZvNI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/ODI5MTc5OC9waG90/by9hcnRpZmljaWFs/LWludGVsbGlnZW5j/ZS1hbmQtbWFjaGlu/ZS1sZWFybmluZy1j/b25jZXB0LndlYnA_/YT0xJmI9MSZzPTYx/Mng2MTImdz0wJms9/MjAmYz1abjZmM3M1/WF9CZHgtSXJ1VDd0/QTU4Q2ZNajU2OXhw/cDF0b0otYVZaSFpN/PQ"
                  />
                  <SideBar_Component
                    title="DevC"
                    description="Development Club"
                    img="https://imgs.search.brave.com/B50W_wTa7i9vbGODFbFvsFV6tKEu9UASdPs6GHC_Oso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2dyaWRzLzliNS9s/ZXR0ZXJzLXdlYi0z/LTE1NzQ3NDkuanBn"
                  />
                  <SideBar_Component
                    title="Web 3"
                    description="WEB 3 technologies"
                    img="https://imgs.search.brave.com/cgzcDwIoya9c4h8L4ye2eP1A-zYMn6MEolxoFSfUcdc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MTQwMTM1NS9waG90/by93ZWItMy0wLWNv/bmNlcHQtb2YtZGVj/ZW50cmFsaXplZC1p/bnRlcm5ldC0zZC1y/ZW5kZXIuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXI4LVJS/OEhlVnZNcFVublph/NEQ5bnJwXy1WcVJw/dUEtMG9OdndRT2Zx/TTg9"
                  />
                  
                  
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="w-full " style={{ height: "calc(100% - 90px)" }}>
              <ScrollArea className="h-full w-full overflow-y-auto   ">
                <div className="w-full flex items-center justify-center my-3">
                  <Card
                    Communitiy_Name="PyC"
                    Image=""
                    Comments={[]}
                    Comments_Count={20}
                    Content="Hello welcome to the community"
                    Upvote_Counts={300}
                    isUpvoted={false}
                    Joined={false}
                    Description="des"
                  />
                </div>
                <div className="w-full flex items-center justify-center my-3" onClick={()=>navigate("/post/1")}>
                  <Card 
                  Communitiy_Name="web development"
                  Image="https://imgs.search.brave.com/cgzcDwIoya9c4h8L4ye2eP1A-zYMn6MEolxoFSfUcdc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MTQwMTM1NS9waG90/by93ZWItMy0wLWNv/bmNlcHQtb2YtZGVj/ZW50cmFsaXplZC1p/bnRlcm5ldC0zZC1y/ZW5kZXIuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXI4LVJS/OEhlVnZNcFVublph/NEQ5bnJwXy1WcVJw/dUEtMG9OdndRT2Zx/TTg9"
                  Comments={[]}
                  Comments_Count={35}
                  Content="Hello welcome to the community,we are thrilled to announce,that Ashwin rai got placed in Goldman Sachs.
                  He is an alumni of our community.He has been many of his juniors and is a great asset to our community.
                  We are proud of him and wish him all the best for his future endeavours."
                  Upvote_Counts={365}
                  isUpvoted={false}
                  Joined={false}
                  Description="des"/>
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card 
                   Communitiy_Name="Machine Learning"
                   Image=""
                   Comments={[]}
                   Comments_Count={635}
                   Content="Hello welcome to the community,we are thrilled to announce,that deepak kumar patel got placed in High tower.
                   He is a leader of our community.He has mentored many of his juniors and is a great asset to our community.
                   We are proud of him and wish him all the best for his future endeavours."
                   Upvote_Counts={4000}
                   isUpvoted={false}
                   Joined={false}
                   Description="des"/>
                </div>
                
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Home;
