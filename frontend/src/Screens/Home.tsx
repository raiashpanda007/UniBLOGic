import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import { Sidebar_Card as SideBar_Components } from "@/Components/Components";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className={`${mode} h-screen w-screen dark:bg-black overflow-hidden`}>
      <div className="relative top-32" style={{ height: "calc(100% - 36px)" }}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={0} style={{flexBasis:"20%", minWidth: "20%" ,maxWidth:"50%"}}>
            <h1 className="fixed font-poppins font-bold text-2xl dark:text-white p-3">
              Communities
            </h1>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <p>Two</p>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Home;
