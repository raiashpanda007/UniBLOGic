import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/Store/Store";
import { Register_Input } from "@/Components/Components";
import { Button } from "@/components/ui/button";
import {Logo} from "../Components/Components"
import {SubmitHandler,useForm} from 'react-hook-form'
import axios from "axios";
import { setForgotPassword } from "@/Store/forgotPassword";


interface ForgotPassword {
  username:string;
  newpassword:string;
  email:string;
  confirm_password:string;
}
const ForgotPassword = () => {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const forgotPasswordDetails =  useSelector((state: RootState) => state.forgotPassword);
  const {register,handleSubmit} = useForm<ForgotPassword>();
  const dispatch = useDispatch();

  const forgotPassword:SubmitHandler<ForgotPassword> = async (data) => {
    if(data.newpassword !== data.confirm_password){
      alert("Password does not match")
    }
    console.log("Forgot Password Data:",data)
    try {
      const response = await axios.post("http://localhost:3000/api/auth/forgotPassword/requestOTP",{
        
        email:data.email,
        username:data.username,
        password:data.newpassword
      });

      if(response.status === 200) {
        dispatch(setForgotPassword({
          email:data.email,
          username:data.username,
          password:data.newpassword
        }));
        console.log("forgot password : ",forgotPasswordDetails)
        console.log("OTP Generated ")
        navigate("/forgotpassword/verifyOTP");
        
      }

    } catch (error) {
      console.log("Error in generating OTP",error)
    }



  }
  return (
    <form
      className={`${mode} h-screen w-screenz dark:bg-black flex flex-col justify-center items-center space-y-5`}
      onSubmit={handleSubmit(forgotPassword)}
    >
        <div> 
            <Logo label="Forgot Password" />
        </div>
        
      <div className="w-1/2">
        <Register_Input type="text" label="Username" forgotKey={false} {...register("username")}/>
        <Register_Input type="email" label="email" forgotKey={false} {...register("email")}/>
        <Register_Input
          type="password"
          label="new password"
          forgotKey={false}
          {...register("newpassword")}
        />
        <Register_Input
          type="password"
          label="Confirm new password"
          forgotKey={false}
          {...register("confirm_password")}
        />
      </div>
      <div className="w-1/2 flex justify-end"> 
        <Button className="dark:text-white font-poppins" type="submit" >
          Forgot Password
        </Button>
      </div>
    </form>
  );
  
};
export default ForgotPassword;
