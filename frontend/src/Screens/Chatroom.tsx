interface message {
  id: string;
  content: string;
  user:{
    id: string;
    userName: string;
    name: string;
    img: string;
  };
  date: string;
  time: string;
  reply: message | null;

    
}

import { useSelector } from "react-redux";
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

function Chatroom () {
  const mode = useSelector((state: RootState) => state.theme.mode);

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
                  {[...Array(15)].map((_, index) => (
                    <SideBar_Component
                      key={index}
                      title="Title"
                      description="Description"
                      img="img"
                    />
                  ))}
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="w-full relative" style={{ height: "calc(100% - 80px)" }}>
              <ScrollArea className="h-full w-full overflow-y-auto" style={{ height: "calc(100% - 80px)" }}>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                  <Card />
                </div>
                
              </ScrollArea>
              
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Chatroom;
