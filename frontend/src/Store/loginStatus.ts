import { createSlice } from "@reduxjs/toolkit";


interface LoginStatusState {
    userStatus:boolean;
    user: {
        username:string;
        verified:boolean;
        email:string;
        userprofile:string;
    }
    
    
}

const initialState: LoginStatusState = {
    userStatus:true,
    user: {
        username:"",
        verified:false,
        email:"",
        userprofile:""
    }
}
const loginStatusSlice = createSlice({
    name: "loginStatus",
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.userStatus = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})
export const { setUserStatus, setUser } = loginStatusSlice.actions
export default loginStatusSlice.reducer