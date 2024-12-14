import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { More } from "@/assets/Icons/Icons";
import DialogBox from "./DialogBox";

function More_Options_Search() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className={`${mode === "dark" ? "dark" : ""} cursor-pointer`}>
    <Menubar className="bg-white dark:bg-black border dark:border-gray-800 bg">
        <MenubarMenu>
          <MenubarTrigger className="px-3 py-1 bg-white dark:bg-black text-black dark:text-white rounded-md">
            <More className="cursor-pointer" />
          </MenubarTrigger>
          <MenubarContent className="bg-white dark:bg-black text-black dark:text-white shadow-md rounded-md">
            <DialogBox content="Make Admin" operationCode={1} />
            <MenubarSeparator className="my-2 border-t border-gray-300 dark:border-gray-700" />
            <DialogBox content=" Remove "  operationCode={2}/>
            
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default More_Options_Search;

// TODO:
// 1. Add a button that will open a dialog box to confirm that the proccess should be done.
// 2. Pass the function that will contain the call back that call back will store the userInfo and which process is called
// 3. Add a toast to show the user that the process is done.
