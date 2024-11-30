import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "@/Components/Components";
import { useEffect, useState ,useRef} from "react";
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

function Verify_OTP() {
  // Initialize react-hook-form with schema validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const userdetails = useSelector((state: RootState) => state.loginStatus.user); // Access user details from Redux store
  console.log("User Details:", userdetails);

  // Fetch OTP when component mounts
  const hasFetched = useRef(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const requestOTP = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/requestotp",
        { withCredentials: true }
      );
      console.log("Request OTP successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        alert(error.response?.data.message || "Failed to request OTP.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  requestOTP();
}, []);


  // Handle OTP verification
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Form data:", data);
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verifyotp",
        { otp: data.pin },
        { withCredentials: true }
      );
      console.log("Verify OTP successful:", response.data);
      navigate("/dashboard"); // Navigate to dashboard on success
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        alert(error.response?.data.message || "Invalid OTP provided.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading
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
        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default Verify_OTP;
