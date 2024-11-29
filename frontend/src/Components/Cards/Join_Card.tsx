import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Logo } from "../Components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setUser } from '../../Store/loginStatus'; 
import { RootState } from '../../Store/Store';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
// Define the types for the form
interface UserRegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  branch?: string;
  batch?: number;
  confirm_password: string;
  profile_photo?: FileList;
  background_photo?: FileList;
}
interface UserLoginData {
  username: string;
  password: string;
}

export default function Join_Card() {
  const navigate = useNavigate();
  const userdetails = useSelector((state: RootState) => state.loginStatus.user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<UserRegisterData>(); // Set type for useForm

  const loginUser: SubmitHandler<UserLoginData> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {withCredentials:true}
      );
      console.log("Login successful:", response.data);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        alert(error.response?.data.message || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  const registerUser: SubmitHandler<UserRegisterData> = async (data) => {
    if (data.password !== data.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);

    if (data.profile_photo && data.profile_photo[0]) {
      formData.append("profile_photo", data.profile_photo[0]);
    }

    if (data.background_photo && data.background_photo[0]) {
      formData.append("background_photo", data.background_photo[0]);
    }
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        {withCredentials:true}
      );
      console.log("Registration successful:", response.data);
      if(response.data) {
        dispatch(setUser(response.data));
      }


      if (data.email.endsWith("@iiitbh.ac.in")) {
        navigate("/verify_otp");
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        alert(error.response?.data.message || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
      }
    }

    if (data.email.split("@")[1] === "iiitbh.ac.in") {
      // Send OTP and branch and batch
      navigate("/verify_otp");
    }
  };

  return (
    <Tabs defaultValue="register" className="w-[600px] h-1/2 font-poppins">
      <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800 h-14 bg-gray-100">
        <TabsTrigger value="register" className="text-2xl font-semibold h-full">
          Register
        </TabsTrigger>
        <TabsTrigger value="login" className="text-2xl font-semibold h-full">
          Login
        </TabsTrigger>
      </TabsList>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>
              Register to <Logo label="uB" />
            </CardTitle>
            <CardDescription>
              <p>
                Please Enter your correct details <br />
                <strong className="text-red-700">*</strong> (If you are a
                student of IIIT Bhagalpur, please use your IIIT Bhagalpur email)
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(registerUser)}>
              <ScrollArea className="h-[300px] w-full">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("name")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("email")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="branch">Branch</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent id="branch" {...register("branch")}>
                      <SelectItem value="CSE">Computer Science</SelectItem>
                      <SelectItem value="ECE">
                        Electronic Communications
                      </SelectItem>
                      <SelectItem value="MNC">
                        Mathematics and Computers
                      </SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="batch">Batch</Label>
                  <Input
                    id="batch"
                    type="number"
                    placeholder="Enter your batch ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("batch")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("username")}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("password")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    placeholder="Enter your password ..."
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("confirm_password")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="profile_photo">Profile Photo</Label>
                  <Input
                    id="profile_photo"
                    type="file"
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("profile_photo")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="background_photo">Background Photo</Label>
                  <Input
                    id="background_photo"
                    type="file"
                    className="placeholder:text-gray-500 placeholder:opacity-75"
                    {...register("background_photo")}
                  />
                </div>
              </ScrollArea>
              <CardFooter>
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>
              Login to <Logo label="uB" />
            </CardTitle>
            <CardDescription>
              Login and start vibing with your community.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(loginUser)}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                  {...register("username")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login_password">Password</Label>
                <Input
                  id="login_password"
                  type="password"
                  placeholder="Enter your password ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                  {...register("password")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
