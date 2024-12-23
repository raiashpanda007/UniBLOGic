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
import {Landing,Register,Home, Post,UserDetails,Demo,Chatroom, Verify_OTP,ForgotPassword,Verify_OTP_forgot,Community} from "./Screens/Screens.ts";

const routes = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>
    <Route path="" element={<Landing />} />
    <Route path="join_us" element={<Register />} />
    <Route path="home" element={<Home />} />
    <Route path="post/:post_id" element={<Post />} />
    <Route path="user/:user_id" element = {<UserDetails />}/>
    <Route path="chatroom/:communityid" element={<Chatroom />} />
    <Route path="verify_otp" element={<Verify_OTP />} />
    <Route path="test" element={<Demo />} />
    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="community/:community_id" element={<Community/>} />
    <Route path="forgotpassword/verifyOTP" element={<Verify_OTP_forgot/>} />
      

  </Route>)
);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
