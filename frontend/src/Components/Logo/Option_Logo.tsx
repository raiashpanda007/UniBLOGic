import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";

interface LogoProps {
  label: string;
  className?: string;
  
}

function Option_Logo({ label,className, }: LogoProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  
  return (
    <h1 className={mode === 'light' 
      ? `${className} font-bold font-poppins bg-gradient-to-r from-[#1a75ff] via-[#ff66b3] to-[#ff4d94] bg-clip-text text-transparent` 
      : `${className} font-bold font-poppins bg-gradient-to-r from-[#ff6bbd] via-[#3385ff] to-[#4d4d4d] bg-clip-text text-transparent webkit-text-clip`}>
      {label}
      
    </h1>
  );
}

export default Option_Logo;
