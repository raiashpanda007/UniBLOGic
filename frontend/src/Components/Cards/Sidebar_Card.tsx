import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface Sidebar_CardProps {
  title?: string;
  description?: string;
  img?: string;
  className?: string;
}

const Sidebar_Card = ({
  title = "",
  description = "",
  img = "",
  className = "",
}: Sidebar_CardProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title,
    description,
    img,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData({
        title: title,
        description: description,
        img: img,
      });
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`h-20 w-full my-2 rounded-md p-1 cursor-pointer transition duration-300 ease-in-out ${className}
      bg-white dark:bg-black text-black dark:text-white
      hover:shadow-md hover:shadow-gray-400/50 dark:hover:shadow-2xl dark:hover:shadow-gray-900/80
      hover:scale-105`}
    >
      <div className="flex justify-evenly items-center space-x-4">
        {loading ? (
          <Skeleton className="h-12 w-12 rounded-full" />
        ) : (
          <img
            src={data.img}
            alt="User"
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
              <h2 className="text-lg font-semibold font-poppins">{data.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">{data.description}</p>
            </div>
          )}
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
  );
};

export default Sidebar_Card;
