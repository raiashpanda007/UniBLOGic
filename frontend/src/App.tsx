import type { RootState ,AppDispatch} from "./Store/Store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AnimatedText, header as Header,Loader,Logo } from "./Components/Components";
import { ToastProvider } from "@/components/ui/toast";
import { setLoading } from "./Store/loading";
import { useDispatch } from "react-redux";

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const loadingmsg = useSelector((state: RootState) => state.loading.loadingMsg);
  const dispatch = useDispatch<AppDispatch>();
  

  return (
    <ToastProvider>
      {" "}
      {/* Wrap with Shadcn's ToastProvider */}
      {loading && (
        <div className={` ${mode} fixed top-0 left-0 w-screen h-screen dark:bg-black  bg-opacity-90 backdrop-blur-lg flex flex-col justify-center items-center z-[9999]`}>

          <div className="flex flex-col justify-center items-center dark:bg-black">
          <Loader />
          <Logo label={"uB"} />
          <p className="text-center text-2xl font-bold text-red-500 font-poppins dark:bg-black">{loadingmsg}</p>
          <h1 className="text-center text-2xl font-bold dark:text-white font-poppins  " >
            Wait Please we have very small servers to transcoding and hls conversions takes a lot of time about 5-10 minutes. <br />
            Please wait for the video to be processed. <br />
            <div className="text-red-500">Please do not refresh the page or close the browser.</div> <br />
            <div className="flex justify-center items-center">
            Thank you for your patience <AnimatedText text="..." interval={500} />
            </div>
          </h1>
          </div>
        </div>
      )}
      <div
        className={
          mode === "light"
            ? `relative bg-white overflow-hidden`
            : `dark relative overflow-hidden bg-black`
        }
      >
        <Header />

        <Outlet />
      </div>
    </ToastProvider>
  );
}

export default App;
