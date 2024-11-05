import type { RootState } from './Store/Store'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import { header as Header } from './Components/Components'
import { ToastProvider } from "@/components/ui/toast"  

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <ToastProvider> {/* Wrap with Shadcn's ToastProvider */}
      <div className={mode === 'light' ? `relative` : `dark relative`}>
        <Header />
        <Outlet />
      </div>
    </ToastProvider>
  )
}

export default App
