import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Logo, Register_Input } from "../Components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setUser, setUserStatus } from "../../Store/loginStatus";
import { RootState } from "../../Store/Store";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the types for the form
interface UserRegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  branch?: string;
  batch?: number;
  confirm_password: string;
  profilePicture?: FileList;
  coverImage?: FileList;
}

interface UserLoginData {
  username: string;
  password: string;
}

export default function Join_Card() {
  const navigate = useNavigate();
  const userdetails = useSelector((state: RootState) => state.loginStatus.user);
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm<UserRegisterData>();

  const loginUser: SubmitHandler<UserLoginData> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);
      dispatch(setUserStatus(true));
      const { email, username } = response.data.data;
      console.log("email:", email);
      dispatch(setUser(response.data.data));
      console.log("User details:", userdetails);
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

    console.log("Profile Picture:", data.profilePicture);
    console.log("Cover Image:", data.coverImage);

    const formData = new FormData();
    console.log("Registering user:", data);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("branch", data.branch || "");
    formData.append("batch", data.batch?.toString() || "");
    

    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    if (data.coverImage && data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }



    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });


    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true,headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (
        response.status === 400 &&
        response.data.message === "Please provide batch and branch"
      ) {
        alert("Please provide batch and branch");
      }
      console.log("Registration successful:", response.data);
      if (response.data) {
        console.log("Login successful:", response.data);
        dispatch(setUserStatus(true));
        dispatch(setUser(response.data.data));
        console.log("User details:", userdetails);
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
  };

  return (
    <Tabs defaultValue="register" className="w-[600px] h-1/2 font-poppins">
      <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800 h-14 bg-gray-100">
        <TabsTrigger value="register" className="text-2xl font-semibold font-montserrat h-full">
          Register
        </TabsTrigger>
        <TabsTrigger value="login" className="text-2xl font-semibold font-montserrat h-full">
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
                <Register_Input
                  label="Name"
                  forgotKey={false}
                  type="text"
                  {...register("name")}
                />
                <Register_Input
                  label="Email"
                  forgotKey={false}
                  type="email"
                  {...register("email")}
                />
                <div className="space-y-1">
                  <Label htmlFor="branch">Branch</Label>
                  <Select onValueChange={(value) => setValue("branch", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Branch" />
                    </SelectTrigger>
                    <SelectContent id="branch">
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
                  <Register_Input
                    label="Batch"
                    type="number"
                    forgotKey={false}
                    {...register("batch")}
                  />
                </div>
                <Register_Input
                  label="Username"
                  type="text"
                  forgotKey={false}
                  {...register("username")}
                />
                <Register_Input
                  label="Password"
                  type="password"
                  forgotKey={false}
                  {...register("password")}
                />
                <Register_Input
                  label="Confirm Password"
                  type="password"
                  forgotKey={false}
                  {...register("confirm_password")}
                />
                <Register_Input
                  label="Profile Photo"
                  type="file"
                  forgotKey={false}
                  {...register("profilePicture")}
                />
                <Register_Input
                  label="Background Photo"
                  type="file"
                  forgotKey={false}
                  {...register("coverImage")}
                />
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
              <Register_Input
                label="Username"
                type="text"
                forgotKey={false}
                {...register("username")}
              />
              <Register_Input
                label="Password"
                type="password"
                forgotKey={true}
                {...register("password")}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
