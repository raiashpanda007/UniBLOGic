import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "@/Components/Components";
import type { RootState } from "@/Store/Store";
import {
  Sidebar_Card as SideBar_Component,
  Home_Card as Card,
  Message_Input,
  Message,
} from "@/Components/Components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
interface User {
  id: string;
  userName: string;
  name: string;
  img: string;
}
interface Message {
  id: string;
  content: string;
  user: User;
  date: string;
  time: string;
  reply: {
    message: Message | null;
    reply: string;
  } | null;
  img: string | null;
}

function Chatroom() {
  const [reply, setReply] = useState<Message | null>(null);
  const [replyVisiblity, setReplyVisiblity] = useState<boolean>(false);
  const mode = useSelector((state: RootState) => state.theme.mode);

  const messages: Message[] = [
    {
      id: "1",
      content: "Hello",
      user: {
        id: "1",
        userName: "ajay",
        name: "ajay",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: {
        message: null,
        reply: "Hello",
      },
      img: null,
    },
    {
      id: "2",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus cum maxime quia dicta, exercitationem ipsam non eum corporis tenetur dolorem quis dignissimos numquam, vero pariatur tempora neque quisquam illo commodi.",
      user: {
        id: "2",
        userName: "alex",
        name: "Alex",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: {
        message: {
          id: "1",
          content: "Hello",
          user: {
            id: "1",
            userName: "ajay",
            name: "ajay",
            img: "",
          },
          date: Date.now().toString(),
          time: Date.now().toString(),
          reply: null,
          img: null,
        },
        reply: "",
      },
      img: "https://images.pexels.com/photos/17525263/pexels-photo-17525263/free-photo-of-peach-juice-in-glasses.jpeg",
    },
  ];

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
            <h1 className="fixed font-poppins px-3 font-bold text-2xl bg-white dark:bg-black dark:text-white">
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
            <div
              className="w-full relative"
              style={{ height: "calc(100% - 80px)" }}
            >
              <div className="w-full h-5 flex justify-end">
                  <Button variant={"outline"}>
                    <Option_Logo label="Add a post" />
                  </Button>
              </div>
              <ScrollArea className="h-full overflow-y-auto">
                <div className="flex flex-col flex-wrap">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex min-w-[25%] w-1/2 p-2">
                      <Message
                        message={msg}
                        onClick={() => {
                          setReply(msg);
                          setReplyVisiblity(true);
                        }}
                      />
                    </div>
                  ))}
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex min-w-[25%] w-1/2 p-2">
                      <Message
                        message={msg}
                        onClick={() => {
                          setReply(msg);
                          setReplyVisiblity(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Message_Input
                repliedMessage={reply}
                isReplyVisible={replyVisiblity}
                setReplyVisibility={() => setReplyVisiblity(!replyVisiblity)}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Chatroom;
