import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { store } from "./Store/Store";
import { Provider } from "react-redux";
import {Landing,Register,Home, Post,User_Profile,Chat,Chatroom, Verify_OTP} from "./Screens/Screens.ts";

const routes = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>
    <Route path="" element={<Landing />} />
    <Route path="join_us" element={<Register />} />
    <Route path="home" element={<Home />} />
    <Route path="post/:post_id" element={<Post />} />
    <Route path="user/:user_id" element = {<User_Profile />}/>
    <Route path="chatroom/:chat_id" element={<Chatroom />} />
    <Route path="verify_otp" element={<Verify_OTP />} />
    <Route path="test" element={<Chat />} />
  </Route>)
);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
