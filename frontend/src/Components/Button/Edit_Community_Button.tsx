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
import { useNavigate, useParams } from "react-router-dom";
import { Edit as EditIcon } from "@/assets/Icons/Icons";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/Store/Store";
import { Register_Input } from "../Components";
import axios from "axios";
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
import { useDispatch } from "react-redux";

import { setUser } from "@/Store/loginStatus";

function Edit({ type = "Community", defaultValues }: EditProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { community_id, user_id } = useParams();

  const { register, handleSubmit } = useForm<Register_Form>();
  const onSubmitUser: SubmitHandler<Register_Form> = async (data) => {
    const formData = new FormData();
    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }
    formData.append("name", data.name);
    formData.append("username", data?.username || "");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            userid: user_id,
          },
          withCredentials: true,
        }
      );

      if (response.data.data) {
        dispatch(setUser(response.data.data));
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitCommunity: SubmitHandler<Register_Form> = async (data) => {
    const formData = new FormData();

    if (data.communityLogo && data.communityLogo.length > 0) {
      formData.append("communityLogo", data.communityLogo[0]);
    }
    formData.append("name", data.name);
    formData.append("description", data.description || "");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/community/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            communityid: community_id,
          },
          withCredentials: true,
        }
      );
      if (response.data.data) navigate(0);
    } catch (error) {
      console.log(error);
    }
  };
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
            <form onSubmit={handleSubmit(onSubmitCommunity)}>
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
            <form onSubmit={handleSubmit(onSubmitUser)}>
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
                defaultValue={defaultValues?.username}
              />
              <Register_Input
                label="Profile Photo"
                type="file"
                forgotKey={false}
                {...register("profilePicture")}
              />
              <DialogFooter className="mt-2">
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
