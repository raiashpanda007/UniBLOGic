import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { More } from "@/assets/Icons/Icons";
import DialogBox from "./DialogBox";
import { useNavigate } from "react-router-dom";
interface Data {
  name: string;
  username: string | null;
  description: string | null;
  profilePicture: string | null;
  communityLogo: string | null;
  id:string;

}
interface MoreOptionProps {
  Data:Data;
  communityid?:string
}
function More_Options_Search({Data,communityid}:MoreOptionProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();
  const MakeAdmin = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/community/makeadmin`,{
          communityid,
          userid:Data.id
        },{
          withCredentials:true
        }
        
      )
      if(response.data) {
        navigate(0);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const removeMember = async () =>{
    try {
      const response = await axios.put(
        `http://localhost:3000/api/community/removeuser`, {
          communityid,
          userid: Data.id
        }, {
          withCredentials: true
        }
      )
      if (response) {
        navigate(0);
      }
      console.log(response.data);
    } catch (error) {
      
    }
  }
  return (
    <div className={`${mode === "dark" ? "dark" : ""} cursor-pointer`}>
    <Menubar className="bg-white dark:bg-black border dark:border-gray-800 bg">
        <MenubarMenu>
          <MenubarTrigger className="px-3 py-1 bg-white dark:bg-black text-black dark:text-white rounded-md">
            <More className="cursor-pointer" />
          </MenubarTrigger>
          <MenubarContent className="bg-white dark:bg-black text-black dark:text-white shadow-md rounded-md">
            <DialogBox content="Make Admin"  onClick={MakeAdmin} />
            <MenubarSeparator className="my-2 border-t border-gray-300 dark:border-gray-700" />
            <DialogBox content=" Remove "   onClick={removeMember}/>
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
