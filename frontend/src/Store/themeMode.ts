import { createSlice } from "@reduxjs/toolkit";

interface ThemeModeState {
    theme:string;
    mode:string;
}

const initialState:ThemeModeState = {
    theme:"default",
    mode:"light"
}
const themeModeSlice = createSlice({
    name:"themeMode",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.theme = action.payload;
        },
        setMode:(state,action)=>{
            state.mode = action.payload;
        }
    }
})
export const {setTheme,setMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;