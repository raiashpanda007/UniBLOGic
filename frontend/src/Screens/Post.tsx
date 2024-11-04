import React from "react";
import { Home_Card as Card } from "@/Components/Components";
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
        <ScrollArea className="w-full flex justify-center">
          <div className="w-2/3 flex flex-col items-center">
            <Card />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Post;
