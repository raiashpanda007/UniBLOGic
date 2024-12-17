import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import Descriptions_Component from "../Drop Down/Description_Component";
interface Sidebar_CardProps {
  name?: string;
  description?: string;
  commuityLogo?: string;
  className?: string;
  loading: boolean;
}

const Sidebar_Card = ({
  name = "",
  description = "",
  commuityLogo ,
  className = "",
  loading,
}: Sidebar_CardProps) => {
  

  return (
    <div
      className={`h-20 w-[calc(100%-10px)] my-2 rounded-md p-1 cursor-pointer transition duration-300 ease-in-out ${className}
      bg-white dark:bg-black text-black dark:text-white
      hover:shadow-md hover:shadow-gray-400/50 dark:hover:shadow-2xl dark:hover:shadow-gray-900/80
      hover:scale-105 overflow-x-hidden`}
    >
      <div className="flex justify-evenly items-center space-x-4">
        {loading ? (
          <Skeleton className="h-12 w-12 rounded-full" />
        ) : (
          <img
            src={commuityLogo}
            alt=""
            className="h-12 w-12 rounded-full border dark:border-gray-600"
          />
        )}
        <div className="space-y-2">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold font-poppins">{name}</h2>
              <Descriptions_Component text={description} text_length={10} needShowmore={false} />
            </div>
          )}
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
  );
};

export default Sidebar_Card;
