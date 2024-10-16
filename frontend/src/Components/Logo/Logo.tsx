import React from "react";
import type { RootState } from "../../Store/Store";
import { useSelector } from "react-redux";
function Logo() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <h1 className="text-[4em] font-bold bg-gradient-to-r from-[#1a75ff] via-[#ff4d94] to-[#ffffff] bg-clip-text text-transparent webkit-text-clip">
      Your Heading
    </h1>
  );
}

export default Logo;
