import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Option_Logo } from "../Components";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { pushCommunity,popCommunity } from "@/Store/communitiesList";
import type { RootState } from "@/Store/Store";

interface ButtonGhostProps {
  Joined: boolean;
  communityid: string;
}

export default function ButtonGhost({ Joined, communityid }: ButtonGhostProps) {
  const dispatch = useDispatch();
  const [isJoined, setIsJoined] = useState(Joined);
  const userID = useSelector((state: RootState) => state.loginStatus.user.id);
  const communityList = useSelector((state: RootState) => state.communitiesList.communities);

  const joinCommunity = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/community/adduser",
        { communityid, userid: userID },
        { withCredentials: true }
      );
      dispatch(pushCommunity(response.data.data));
      return response.data.success;

    } catch (error) {
      console.error("Error in joining community", error);
    }


  };

  const leaveCommunity = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/community/removeuser",
        { communityid, userid: userID },{
          withCredentials: true
        }
      );
      console.log(communityList)
      console.log(response.data.data.id);
      dispatch(popCommunity(response.data.data.id));
      return response;
    } catch (error) {
      console.error("Error in leaving community", error);
    }
  };

  return (
    <Button
      variant="ghost"
      className={
        isJoined
          ? "font-poppins font-semibold text-black dark:text-white"
          : "font-poppins font-semibold dark:text-white text-blue-500"
      }
      onClick={async () => {
        
        if (isJoined) {
          const response = await leaveCommunity();
          // console.log(response);
          if (response ) {
            setIsJoined((prev) => !prev);
          }
        } else {
          const response = await joinCommunity();
          
          if (response) {
            setIsJoined((prev) => !prev);
          }
        }
      }}
    >
      {isJoined ? "JOINED" : <Option_Logo label="JOIN + " />}
    </Button>
  );
}
