import { Button } from "@/components/ui/button";
import { Logo } from "../Components";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export default function Join_Card() {
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
            <ScrollArea className="h-[300px] w-full">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Enter your password ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="profile_photo">Profile Photo</Label>
                <Input
                  id="profile_photo"
                  type="file"
                  placeholder="Enter your username ..."
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="background_photo">Background Photo</Label>
                <Input
                  id="background_photo"
                  type="file"
                  placeholder=""
                  className="placeholder:text-gray-500 placeholder:opacity-75"
                />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
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
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username ..."
                className="placeholder:text-gray-500 placeholder:opacity-75"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="login_password">Password</Label>
              <Input
                id="login_password"
                type="password"
                placeholder="Enter your password ..."
                className="placeholder:text-gray-500 placeholder:opacity-75"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
