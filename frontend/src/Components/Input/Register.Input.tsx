import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface Register_InputProps {
  forgotKey: boolean;
  type:string;
  label: string;
}

const Register_Input = forwardRef<HTMLInputElement, Register_InputProps>(
  ({ forgotKey = false, label,type , ...props}, ref) => {
    return (
      <div >
        <div className="flex justify-between">
          <Label htmlFor={label}>{label}</Label>
          {forgotKey && (
            <Link
              to={"/forgotPassword"}
              className="font-poppins text-red-600 text-sm"
            >
              Forgot password
            </Link>
          )}
        </div>
        <Input
          id={label}
          type={type}
          placeholder={`Enter your  ${label} ... `}
          className="placeholder:text-gray-500 placeholder:opacity-75"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Register_Input;
