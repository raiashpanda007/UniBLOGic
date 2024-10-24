import { useSelector } from "react-redux";
import type { RootState } from "@/Store/Store";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

function Home() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  return (
    <div className={`${mode} h-screen w-screen dark:bg-black `}>
      
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
      
    </div>
  );
}

export default Home;
