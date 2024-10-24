import { createSlice } from "@reduxjs/toolkit";


interface LoginStatusState {
    userStatus:boolean;
    user: {
        username:string;
        verified:boolean;
        email:string;
    }
    
    
}

const initialState: LoginStatusState = {
    userStatus:false,
    user: {
        username:"",
        verified:false,
        email:""
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