import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >

    </Route>,
  ),
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
