

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Logo } from "@/Components/Components"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { RootState } from '../Store/Store';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

function Verify_OTP() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const navigate = useNavigate()
  const userdetails = useSelector((state: RootState) => state.loginStatus.user);
  const {email, username,branch,batch} = userdetails;
  console.log("Email:", email);
  useEffect(() => {
    
    const requestOTP = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/requestotp",
          {
            email: email,
            username: username,
            branch: branch,
            batch: batch,
          } // This is the request body
        );
        console.log("Request OTP successful:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error response:", error.response?.data);
          alert(error.response?.data.message || "An error occurred");
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    requestOTP();
  }, [email, username, branch, batch]);
  
  

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("You submitted the following values:", data)
  }

  return (
    <Form {...form}>
        
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative top-40 flex flex-col items-center space-y-6">
      <Logo label="Verify OTP"/>
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default Verify_OTP
