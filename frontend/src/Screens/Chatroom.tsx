import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Option_Logo, CreatePost } from "@/Components/Components";
import type { RootState } from "@/Store/Store";
import {
  Sidebar_Card as SideBar_Component,
  Home_Card as Card,
  Message_Input,
  Message,
  CreateCommunity
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
      content: "How's it going, everyone?",
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
    {
      id: "3",
      content: "What's the plan for the weekend?",
      user: {
        id: "3",
        userName: "maria",
        name: "Maria",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: null,
      img: null,
    },
    {
      id: "4",
      content: "Here’s a quick photo I took.",
      user: {
        id: "4",
        userName: "chris",
        name: "Chris",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: null,
      img: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    },
    {
      id: "5",
      content: "Did you check out the new restaurant?",
      user: {
        id: "5",
        userName: "lucy",
        name: "Lucy",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: null,
      img: null,
    },
    {
      id: "6",
      content: "Here's a cool video I found!",
      user: {
        id: "6",
        userName: "john",
        name: "John",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: {
        message: {
          id: "2",
          content: "How's it going, everyone?",
          user: {
            id: "2",
            userName: "alex",
            name: "Alex",
            img: "",
          },
          date: Date.now().toString(),
          time: Date.now().toString(),
          reply: null,
          img: null,
        },
        reply: "Sounds interesting!",
      },
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
    },
    {
      id: "7",
      content: "Can someone help with my code?",
      user: {
        id: "7",
        userName: "sam",
        name: "Sam",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: {
        message: {
          id: "3",
          content: "What's the plan for the weekend?",
          user: {
            id: "3",
            userName: "maria",
            name: "Maria",
            img: "",
          },
          date: Date.now().toString(),
          time: Date.now().toString(),
          reply: null,
          img: null,
        },
        reply: "I might be able to assist!",
      },
      img: null,
    },
    {
      id: "8",
      content: "I just finished a new project!",
      user: {
        id: "8",
        userName: "emma",
        name: "Emma",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: null,
      img: "https://images.pexels.com/photos/7367/startup-photos.jpg",
    },
    {
      id: "9",
      content: "What are your thoughts on the latest tech news?",
      user: {
        id: "9",
        userName: "liam",
        name: "Liam",
        img: "",
      },
      date: Date.now().toString(),
      time: Date.now().toString(),
      reply: null,
      img: null,
    },
    
  ];
  const message = {
    id: "10",
    content: "Got a new book recommendation?",
    user: {
      id: "10",
      userName: "olivia",
      name: "Olivia",
      img: "",
    },
    date: Date.now().toString(),
    time: Date.now().toString(),
    reply: {
      message: {
        id: "5",
        content: "Did you check out the new restaurant?",
        user: {
          id: "5",
          userName: "lucy",
          name: "Lucy",
          img: "",
        },
        date: Date.now().toString(),
        time: Date.now().toString(),
        reply: null,
        img: null,
      },
      reply: "Yes! It's a must-read.",
    },
    img: null,
  }

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
            <div className="w-full flex justify-between">
              <h1 className=" font-poppins px-3 font-bold text-2xl bg-white dark:bg-black dark:text-white">
                Communities
              </h1>
              <CreateCommunity />
            </div>

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
            <div
              className="w-full relative"
              style={{ height: "calc(100% - 90px)" }}
            >
              <CreatePost />

              <ScrollArea
                className="h-full overflow-y-auto"
                style={{ height: "calc(100% - 100px)" }}
              >
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
