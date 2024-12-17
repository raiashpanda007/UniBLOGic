import More_Options_Search from "../Button/More info/More_Options_Search";
import { useEffect, useState } from "react";
import Descriptions_Component from "../Drop Down/Description_Component";
import { PersonIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
interface Data {
  name: string;
  username: string | null;
  description: string | null;
  profilePicture: string | null;
  communityLogo: string | null;
  id:string;

}
interface User_Result_CardProps {
  Data: Data;
  type: string,
}

function User_Result_Card({ ...Props }: User_Result_CardProps) {
  const {community_id} = useParams();
  
  const [totalHeight, setTotalHeight] = useState("h-28");

  useEffect(()=>{
    if(!Props.Data.username) {
      setTotalHeight("h-36")
    }
  })

  return (
    <div
  className="h-28 rounded-md border hover:border-black flex dark:hover:border-white cursor-pointer transition-all duration-300"
  style={{ width: "calc(100% - 25px)" }}
>

      <div className="w-1/6 h-full flex items-center justify-start ">
        {Props.Data.profilePicture === "" || !Props.Data.profilePicture ? (
          <div className="ml-2 w-24 h-24 rounded-full  flex items-center justify-center">
            <PersonIcon className=" w-20  h-20 dark:text-white" />
          </div>
        ) : (
          <img
            src={Props.Data.profilePicture}
            alt="profile"
            className="ml-2 w-24 h-24 rounded-full"
          />
        )}
      </div>
      <div className="w-5/6 h-full flex items-center justify-between font-poppins dark:text-white ">
        <div className=" h-full flex flex-col items-start justify-center">
          <div className="text-3xl font-poppins font-bold">{Props.Data.name}</div>
          {
           Props.Data.username && <div className="text-sm font-bold">@{Props.Data.username}</div>
          }
          {
            Props.Data.description && <div className="text-sm">
              <Descriptions_Component text={Props.Data.description} needShowmore={false} text_length={260}/>
            </div>
          }
        </div>
        {Props.type === "user" && <div className="flex ">
          <More_Options_Search Data={Props.Data} communityid={community_id} />
        </div>}
      </div>
    </div>
  );
}

export default User_Result_Card;
