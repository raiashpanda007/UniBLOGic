import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit as EditIcon } from "@/assets/Icons/Icons" 
import { useSelector } from "react-redux"
import type { RootState } from "@/Store/Store"
import { Register_Input } from "../Components"
interface EditProps {
  type:string;
}
function Edit({type = "Community"} : EditProps) {
    const mode = useSelector((state:RootState) => state.theme.mode)
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">
            <EditIcon className="w-5 h-5 dark:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${mode}`}>
        <DialogHeader>
          <DialogTitle className="dark:text-white">Edit profile</DialogTitle>
          <DialogDescription className="dark:text-white">
            Make changes to community profile . Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className={` grid gap-4 py-4 dark:text-white dark:bg-black`}>
          
          <Register_Input forgotKey={false} type="text" label="Community Title"/>
          <Register_Input forgotKey={false} type="textarea" label="Community Description"/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default Edit