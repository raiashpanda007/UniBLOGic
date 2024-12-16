import { forwardRef } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

interface Register_InputProps {
  forgotKey: boolean;
  type:string;
  label: string;
  defaultValue?: string;
}

const Register_Input = forwardRef<HTMLInputElement, Register_InputProps>(
  ({ forgotKey = false, label,type ,defaultValue, ...props}, ref) => {
    return (
      <div className="space-y-2 mt-2">
        <div className="flex justify-between dark:text-white">
          <Label htmlFor={label} className="font-montserrat">{label}</Label>
          {forgotKey && (
            <Link
              to={"/forgotPassword"}
              className="font-poppins text-red-600 text-sm"
            >
              Forgot password
            </Link>
          )}
        </div>
        {
          type === "textarea" ? 
          <Textarea
            id={label}
            placeholder={`Enter your  ${label} ... `}
            className="placeholder:text-gray-500 placeholder:opacity-75 placeholder:font-poppins"
            ref={ref as React.Ref<HTMLTextAreaElement>}
            defaultValue={defaultValue}
            {...props}

            
          />
          :
          <Input
          id={label}
          type={type}
          placeholder={`Enter your  ${label} ... `}
          className="placeholder:text-gray-500 placeholder:opacity-75"
          ref={ref}
          defaultValue={defaultValue}
          {...props}
        />
        }
      </div>
    );
  }
);

export default Register_Input;
