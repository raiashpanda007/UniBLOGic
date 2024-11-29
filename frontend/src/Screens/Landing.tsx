import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store"; // Adjust the path based on your project structure.
import Heading from "@/Components/Logo/Heading";
import { Outline_Button } from "@/Components/Button/Outline_Button";
import { useNavigate } from "react-router-dom"; 

const Landing: React.FC = () => {
  // Type the state as RootState for better type safety.
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className="h-screen w-screen  dark:bg-black">
      {mode === "light" ? (
        <div className="bg-white h-screen relative dark:text-white overflow-hidden">
          {/* 8x large blurry circular gradient 1 */}
          <div className="absolute top-10 left-20 w-[540px] h-[540px] bg-gradient-radial from-pink-500/70 via-pink-500/40 to-transparent rounded-full opacity-80 filter blur-[250px]">
            {/* Content 1 */}
          </div>

          {/* 8x large blurry circular gradient 2 */}
          <div className="absolute top-1/3 right-20 w-[384px] h-[384px] bg-gradient-radial from-blue-500/70 via-blue-500/40 to-transparent rounded-full opacity-80 filter blur-[120px]">
            {/* Content 2 */}
          </div>

          {/* 8x large blurry circular gradient 3 */}
          <div className="absolute bottom-10 left-1/3 w-[448px] h-[448px] bg-gradient-radial from-purple-500/70 via-purple-500/40 to-transparent rounded-full opacity-80 filter blur-[130px]">
            {/* Content 3 */}
          </div>

          <div className="relative top-32 w-full">
            <div className="relative top-32 w-full flex justify-center">
              <Heading label={"UniBLOGic"} />
            </div>
            <div className="relative z-50 top-50 dark:text-white h-10">
            <div className="relative z-50 top-50 dark:text-white h-10 w-full flex flex-col items-center">
              <p className=" w-1/3 relative top-64 font-poppins text-lg">
              A vibrant <strong>platform</strong> where students <strong>connect</strong>, <strong>collaborate</strong>, and <strong>engage</strong> through communities. Discover posts, join discussions, and participate in chatrooms tailored to your interests, all in one place.
              </p>

              <div className="relative top-72 w-1/3 flex justify-between">
                <Outline_Button label="Join Now" classname="dark text-white  h-14 text-2xl font-poppins font-semibold" onClick={()=>navigate("/join_us")}/>
               
              </div>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black h-screen relative text-white overflow-hidden">
          {/* 8x large blurry circular gradient 1 */}
          <div className="absolute top-10 left-20 w-[512px] h-[512px] bg-gradient-radial from-pink-500/70 via-pink-500/40 to-transparent rounded-full opacity-80 filter blur-[150px]">
            {/* Content 1 */}
          </div>

          {/* 8x large blurry circular gradient 2 */}
          <div className="absolute top-1/3 right-20 w-[384px] h-[384px] bg-gradient-radial from-blue-500/70 via-blue-500/40 to-transparent rounded-full opacity-80 filter blur-[220px]">
            {/* Content 2 */}
          </div>

          {/* 8x large blurry circular gradient 3 */}
          <div className="absolute bottom-10 left-1/3 w-[448px] h-[448px] bg-gradient-radial from-purple-500/70 via-purple-500/40 to-transparent rounded-full opacity-80 filter blur-[230px]">
            {/* Content 3 */}
          </div>

          <div className="relative top-32 w-full">
            <div className="relative top-32 w-full flex justify-center">
              <Heading label={"UniBLOGic"} />
            </div>
            <div className="relative z-50 top-50 dark:text-white h-10">
            <div className="relative z-50 top-50 dark:text-white h-10 w-full flex flex-col items-center">
              <p className=" w-1/3 relative top-64 font-poppins text-lg">
              A vibrant <strong>platform</strong> where students <strong>connect</strong>, <strong>collaborate</strong>, and <strong>engage</strong> through communities. Discover posts, join discussions, and participate in chatrooms tailored to your interests, all in one place.
              </p>

              <div className="relative top-72 w-1/3 flex justify-between">
                <Outline_Button label="Join Now" classname="h-14 dark text-white text-2xl font-poppins font-semibold" onClick={()=>navigate("/join_us")}/>
                
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
