import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit as EditIcon } from "@/assets/Icons/Icons";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { Register_Input } from "../Components";

import { useForm, SubmitHandler } from "react-hook-form";
interface defaultValues {
  name?: string;
  description?: string;
  username?: string;
}
interface EditProps {
  type: string;
  defaultValues?: defaultValues;
}
interface Register_Form {
  name: string;
  description?: string;
  username?: string;
  profilePicture?: FileList;
  communityLogo?: FileList;
}

function Edit({ type = "Community", defaultValues }: EditProps) {
  const { register, handleSubmit } = useForm<Register_Form>();
  const onSubmit: SubmitHandler<Register_Form> = async (data) => {};
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon className="w-5 h-5 dark:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${mode}`}>
        <DialogHeader>
          <DialogTitle className="dark:text-white font-montserrat text-2xl">
            {type === "Community" ? "Edit Community" : "Edit Profile"}{" "}
            <p className="text-sm dark:text-gray-300 font-light">
              If the following options are available you can edit then contact
              the admin / dev team
            </p>
          </DialogTitle>
          <DialogDescription className="dark:text-white">
            {type === "Community"
              ? "Edit your community details"
              : "Edit your profile details"}
          </DialogDescription>
        </DialogHeader>
        <div className={` grid gap-4 py-4 dark:text-white dark:bg-black`}>
          {type === "Community" ? (
            <form>
              <Register_Input
                label="Community Name"
                type="text"
                forgotKey={false}
                {...register("name")}
                defaultValue={defaultValues?.name}
              />
              <Register_Input
                label="Community Description"
                type="textarea"
                forgotKey={false}
                {...register("description")}
                defaultValue={defaultValues?.description}
              />
              <Register_Input
                label="Community Logo"
                type="file"
                forgotKey={false}
                {...register("communityLogo")}
              />
              <DialogFooter className="mt-2">
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          ) : (
            <form>
              <Register_Input
                label="Name"
                type="text"
                forgotKey={false}
                {...register("name")}
                defaultValue={defaultValues?.name}
              />
              <Register_Input
                label="username"
                type="text"
                forgotKey={false}
                {...register("username")}
                defaultValue={defaultValues?.name}
              />
              <Register_Input
                label="Profile Photo"
                type="file"
                forgotKey={false}
                {...register("profilePicture")}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default Edit;
