import React from "react";
import { Home_Card as Card,Comment_Input as Inp } from "@/Components/Components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";

import type { RootState } from "@/Store/Store";
function Post() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div
      className={`${mode} h-screen w-screen  dark:bg-black overflow-hidden z-0`}
    >
      <div
        className="relative top-32 flex flex-col items-center"
        style={{ height: "calc(100% - 36px)" }}
      >
        <ScrollArea className="w-full flex flex-col  items-center">
          <div className="w-2/3 flex flex-col items-center">
            <Card Communitiy_Name="PyC" Comments={[]} Comments_Count={20} Content="" Upvote_Counts={300} isUpvoted={true} Image = "https://thumbs.dreamstime.com/z/yellow-hanging-handhold-standing-passengers-modern-bus-suburban-urban-transport-150239834.jpg" Joined={false} Description="Description"/>
          </div>
          <Inp/>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Post;
