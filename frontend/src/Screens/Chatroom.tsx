import { useState } from "react";
import { useSelector } from "react-redux";
import {  CreatePost, Sidebar } from "@/Components/Components";
import type { RootState } from "@/Store/Store";
import {
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
      content: "Here's a quick photo I took.",
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
            <Sidebar />
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
