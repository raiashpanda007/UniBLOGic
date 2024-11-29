import {
  Home_Card as Card,
  Comment_Input as Inp,
} from "@/Components/Components";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSelector } from "react-redux";
import {Comment} from "@/Components/Components";
import type { RootState } from "@/Store/Store";

function Post() {
  const mode = useSelector((state: RootState) => state.theme.mode);

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
              Communitiy_Name="PyC"
              Comments={[]}
              Comments_Count={20}
              Content="Hello welcome to the community,we are thrilled to announce,that Ashwin rai got placed in Goldman Sachs.
                  He is an alumni of our community.He has been many of his juniors and is a great asset to our community.
                  We are proud of him and wish him all the best for his future endeavours."
              Upvote_Counts={300}
              isUpvoted={true}
              Image="https://imgs.search.brave.com/cgzcDwIoya9c4h8L4ye2eP1A-zYMn6MEolxoFSfUcdc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/MTQwMTM1NS9waG90/by93ZWItMy0wLWNv/bmNlcHQtb2YtZGVj/ZW50cmFsaXplZC1p/bnRlcm5ldC0zZC1y/ZW5kZXIuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXI4LVJS/OEhlVnZNcFVublph/NEQ5bnJwXy1WcVJw/dUEtMG9OdndRT2Zx/TTg9"
              Joined={false}
              Description="Description"
            />
          </div>
          <div className="w-2/3 flex flex-col items-center space-y-2">
            <Inp />
            
            <Comment upvotes={32} isUpvoted={true} comment=" great news" date={Date.now().toString()} user="ashwin rai" />
          </div>
        
        </ScrollArea>
      </div>
    </div>
  );
}

export default Post;
