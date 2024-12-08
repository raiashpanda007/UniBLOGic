import { createSlice } from "@reduxjs/toolkit";

interface forgotPassword {
    username:string;
    email:string;
    password:string;

}

const initialState :forgotPassword = {
    username:"",
    email : "",
    password: "",
}

const forgotPasswordSlice = createSlice({
    name:"forgotPassword",
    initialState,
    reducers:{
        setForgotPassword:(state,action) =>{
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        resetForgotPassword:()=>initialState

        
    }
})

export const {setForgotPassword,resetForgotPassword} = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer