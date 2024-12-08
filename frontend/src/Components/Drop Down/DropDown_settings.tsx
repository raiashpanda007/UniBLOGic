import { Settings, Logout } from "@/assets/Icons/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setUserStatus,setUser } from "@/Store/loginStatus";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/Store/Store";
import { setMode } from "@/Store/themeMode";
import axios from "axios";
function DropDown_settings() {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const userStatus = useSelector(
    (state: RootState) => state.loginStatus.userStatus
  );
  console.log(userStatus);
  const dispatch = useDispatch();
  const logout = async () => {
    console.log("Logout");
    const res = await axios.get("http://localhost:3000/api/auth/logout",
      {withCredentials: true}
    );
    if (res.status === 200) {
      navigate("/");
      
    }
    dispatch(setUserStatus(false), setUser({}));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${mode}`}>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={mode}
          onValueChange={() => dispatch(setMode(mode))}
        >
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        
        {
        userStatus && (
          <>
            <DropdownMenuLabel>
              User Account
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  value="logout"
                  className="cursor-pointer flex justify-between"
                  onClick={logout}
                >
                  Logout
                  <Logout />
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown_settings;
