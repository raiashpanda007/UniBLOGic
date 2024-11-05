import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "../Components";
interface ButtonGhostProps {
  Joined: boolean;
}

export default function ButtonGhost({ Joined }: ButtonGhostProps) {
  const [isJoined, setIsJoined] = useState(Joined);

  return (
    <Button
      variant="ghost"
      className={isJoined? "font-poppins font-semibold  text-black" : "font-poppins font-semibold dark:text-white text-blue-500"}
      onClick={() => setIsJoined(!isJoined)}
    >
      {isJoined ? "JOINED": (<Option_Logo label="JOIN + " />)}
    </Button>
  );
}
