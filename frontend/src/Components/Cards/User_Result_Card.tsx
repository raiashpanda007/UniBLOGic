import More_Options_Search from "../Button/More info/More_Options_Search";
import { PersonIcon } from "@radix-ui/react-icons";
interface User {
  name: string;
  username: string;
  profilePicture: string;
}
interface User_Result_CardProps {
  User: User;
}
const Props: User = {
  name: "John Doe",
  username: "johndoe",
  profilePicture: "",
};
function User_Result_Card({ User = Props }: User_Result_CardProps) {
  return (
    <div
      className=" h-28 rounded-md border border-black flex  dark:border-white cursor-pointer"
      style={{ width: "calc(100% - 25px)" }}
    >
      <div className="w-1/6 h-full flex items-center justify-start ">
        {User.profilePicture === "" ? (
          <div className="ml-2 w-24 h-24 rounded-full border flex items-center justify-center">
            <PersonIcon className=" w-20  h-20 dark:text-white" />
          </div>
        ) : (
          <img
            src={User.profilePicture}
            alt="profile"
            className="ml-2 w-24 h-24 rounded-full"
          />
        )}
      </div>
      <div className="w-5/6 h-full flex items-center justify-between font-poppins dark:text-white border">
        <div className=" h-full flex flex-col items-start justify-center">
          <div className="text-3xl font-poppins font-bold">{User.name}</div>
          <div className="text-sm font-bold">@{User.username}</div>
        </div>
        <div className="flex ">
            <More_Options_Search />
        </div>
      </div>
    </div>
  );
}

export default User_Result_Card;
