import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "@/Components/Components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RootState } from "../Store/Store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Validation schema for OTP
const FormSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be exactly 6 characters.",
  }),
});

function Verify_OTP_forgot() {
  // Initialize react-hook-form with schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const forgotPasswordDetails = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userdetails = useSelector((state: RootState) => state.loginStatus.user);
  console.log("User Details:", userdetails);

  // Handle OTP verification
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Forgot Details :", forgotPasswordDetails);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/forgotPassword/verifyOTP",
        {
          email: forgotPasswordDetails.email,
          username: forgotPasswordDetails.username,
          password: forgotPasswordDetails.password,
          otp: data.pin,
        }
      );
      console.log("Response:", response);
      if (response) {
        console.log("OTP Verified",response);
        navigate("/join_us");
      } else {
        console.log("Error in verifying OTP", response);
      }
    } catch (error) {
      console.log("Error in verifying OTP", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative top-40 flex flex-col items-center space-y-6"
      >
        <Logo label="Verify OTP" />
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
        <Button type="submit" >
          Verify OTP
        </Button>
      </form>
    </Form>
  );
}

export default Verify_OTP_forgot;
