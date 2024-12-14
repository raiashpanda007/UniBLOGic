import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { RootState } from "@/Store/Store";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "@/Components/Components";
import { useSelector } from "react-redux";
interface DialogBoxProps {
    operationCode:number,
    content:string
}
const DialogBox = ({content,operationCode} : DialogBoxProps) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    

  return (
    <div className={`${mode} cursor-pointer`}> 
      <Dialog className="dark:bg-black">
  <DialogTrigger className={`  w-full font-poppins rounded-r-lg rounded-l-lg flex justify-start p-2 hover:bg-custom-gray-dialogbox  dark:hover:bg-gray-300`}  >{content}</DialogTrigger>
  <DialogContent className={` bg-white dark:bg-black text-black dark:text-white  rounded-md`}>
    <DialogHeader className={` dark:bg-black `}>
      <DialogTitle className=" font-montserrat text-3xl">Are you absolutely sure?</DialogTitle>
      <DialogDescription className="dark:text-white font-poppins text-lg">
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <Button variant={"ghost"}>
        <Option_Logo label="Confirm" />
    </Button>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default DialogBox;
