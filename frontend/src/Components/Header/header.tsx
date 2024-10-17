import { Settings } from "@/assets/Icons/Icons";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import DropDown_settings from "../Drop Down/DropDown_settings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Header() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div
      className={`${mode} pl-5 pr-5 w-full rounded  bg-transparent z-50 backdrop-blur-3xl fixed top-0 left-0 h-32 border border-1 flex justify-between items-center text-black dark:text-white`}
    >
      <Logo label={"uB"} />

      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <DropDown_settings />
    </TooltipTrigger>
    <TooltipContent>
      <p>Settings</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
    </div>
  );
}

export default Header;
