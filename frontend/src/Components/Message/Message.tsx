import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Option_Logo, Upvote } from "../Components";
import Descriptions_Component from "../Drop Down/Description_Component";
import { Button } from "@/components/ui/button";

interface MessageProps {
  message: {
    id: string;
    content: string;
    user: {
      id: string;
      userName: string;
      name: string;
      img: string;
    };
    date: string;
    time: string;
    reply: {
      message: MessageProps["message"] | null;
      reply: string;
    } | null;
    img: string | null;
  };
  onClick?: () => void;
}

const Message = ({ message, onClick }: MessageProps) => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = {
    id: "1",
    userName: "ajay",
    name: "ajay",
    img: "",
  };

  useEffect(() => {
    if (currentUser.id === message.user.id) {
      setIsUser(true);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [message.user.id]);

  return (
    <div className="flex flex-col">
      {message.reply?.message && (
        <div className="h-8 border min-w-3 max-w-full px-2 font-semibold font-poppins flex items-center bg-gray-200 rounded-sm opacity-50">
          {loading ? (
            <Skeleton className="w-48 h-16" />
          ) : (
            <>
              <Option_Logo label={`${message.reply.message.user.userName} :`} />
              <div>
                <Descriptions_Component text={message.reply.reply} />
              </div>
            </>
          )}
        </div>
      )}
      <div className="min-h-20 max-w-full flex space-x-2">
        {loading ? (
          <Skeleton className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16">
            <img
              src={message.user.img || "/path-to-avatar"}
              alt={`${message.user.userName}'s avatar`}
              className="w-16 h-16 rounded-full object-cover border"
            />
          </div>
        )}

        {loading ? (
          <Skeleton className="w-48 h-16 rounded-lg" />
        ) : (
          <div
            className={`rounded-lg border px-3 space-y-2 ${
              isUser ? "bg-black text-white" : ""
            }`}
            style={{ width: "100%" }}
          >
            {message.img && (
              <img
                src={message.img}
                alt="Message attachment"
                className="w-48 h-48 object-cover rounded-lg"
              />
            )}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Option_Logo label={message.user.userName} />
              </div>
              <p className="font-montserrat font-light text-sm dark:text-white">
                {message.content}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Upvote UpvoteCount={200} Upvoted={false} />
              <Button variant="ghost" onClick={onClick}>
                <Option_Logo label="Reply" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
