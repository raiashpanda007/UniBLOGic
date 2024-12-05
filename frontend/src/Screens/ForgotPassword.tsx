import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { Register_Input } from "@/Components/Components";
import { Button } from "@/components/ui/button";
import {Logo} from "../Components/Components"
const ForgotPassword = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div
      className={`${mode} h-screen w-screenz dark:bg-black flex flex-col justify-center items-center space-y-5`}
    >
        <div> 
            <Logo label="Forgot Password" />
        </div>
        
      <div className="w-1/2">
        <Register_Input type="text" label="Enter username" forgotKey={false} />
        <Register_Input type="email" label="Enter email" forgotKey={false} />
        <Register_Input
          type="password"
          label="Enter new password"
          forgotKey={false}
        />
        <Register_Input
          type="password"
          label="Confirm new password"
          forgotKey={false}
        />
      </div>
      <div className="w-1/2 flex justify-end"> 
        <Button className="dark:text-white font-poppins" >
          Forgot Password
        </Button>
      </div>
    </div>
  );
};
export default ForgotPassword;
