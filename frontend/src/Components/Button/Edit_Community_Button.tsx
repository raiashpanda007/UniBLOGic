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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit as EditIcon } from "@/assets/Icons/Icons" 
import { useSelector } from "react-redux"
import type { RootState } from "@/Store/Store"
function Edit() {
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
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="name" className="text-right">
              Community Name
            </Label>
            <Input id="name" value={"Commuity Name"} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Username
            </Label>
            <Textarea id="description" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default Edit