import { Settings, User } from "@/assets/Icons/Icons";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import DropDown_settings from "../Drop Down/DropDown_settings";
import SearchComponent from "./SearchComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Header() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const userLoginState = useSelector(
    (state: RootState) => state.loginStatus.userStatus
  );

  return (
    <div
      className={`${mode} pl-5 pr-5 w-full rounded  bg-transparent z-50 backdrop-blur-3xl fixed top-0 left-0 h-32 border border-1 flex justify-between items-center text-black dark:text-white`}
    >
      <Logo label={"uB"} />
      {userLoginState ? (
        <div className="w-1/3">
          <SearchComponent />
        </div>
      ) : (
        <div className="w-1/2"></div>
      )}
      <div className="flex  justify-around">
        {userLoginState ? (
          <div className="w-8 h-8 rounded-full mr-3 border dark:border-white flex justify-center items-center">
            <User />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full mr-3 "></div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropDown_settings />
            </TooltipTrigger>
            <TooltipContent
              className={`border border-gray-600 bg-gray-800 text-white dark:bg-white dark:text-black font-semibold rounded-md p-2 shadow-md ${mode}`}
            >
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Header;
