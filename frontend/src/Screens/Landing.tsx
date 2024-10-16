import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store"; // Adjust the path based on your project structure.

const Landing: React.FC = () => {
  // Type the state as RootState for better type safety.
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <>
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

          <p className="absolute bottom-5 left-5 text-white">
            Footer or additional content here.
          </p>
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

          <p className="absolute bottom-5 left-5 text-white">
            Footer or additional content here.
          </p>
        </div>
      )}
    </>
  );
};

export default Landing;
