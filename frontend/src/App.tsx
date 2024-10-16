import React from 'react'
import type { RootState } from './Store/Store'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import { header as Header} from './Components/Components'
function App() {
  const mode = useSelector((state: RootState) => state.theme.mode)
  
  return (
    <div className={mode === 'light ' ? ``:`dark`}>
   
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
