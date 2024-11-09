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
              Content=""
              Upvote_Counts={300}
              isUpvoted={true}
              Image="https://thumbs.dreamstime.com/z/yellow-hanging-handhold-standing-passengers-modern-bus-suburban-urban-transport-150239834.jpg"
              Joined={false}
              Description="Description"
            />
          </div>
          <div className="w-2/3 flex flex-col items-center space-y-2">
            <Inp />
            
            <Comment upvotes={32} isUpvoted={true} comment="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus numquam similique tenetur ratione maiores, id dicta officiis! Fugit natus, nulla enim labore quos doloremque quidem cupiditate quod recusandae necessitatibus fugiat quasi cum debitis voluptate veritatis accusantium, libero sequi eius soluta ullam culpa, consequatur odio! Fuga, nam corporis? Dolorum, ipsam atque. " date={Date.now().toString()} user="ashwin rai" />
          </div>
        
        </ScrollArea>
      </div>
    </div>
  );
}

export default Post;
