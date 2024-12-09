import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "@/Store/Store";
import {
  Sidebar_Card as SideBar_Component,
  Home_Card as Card,
  Sidebar
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
           <Sidebar />
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
