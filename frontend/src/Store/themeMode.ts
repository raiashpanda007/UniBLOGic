import { createSlice } from "@reduxjs/toolkit";

interface ThemeModeState {
    theme:string;
    mode:string;
}
const getMode = () => {
    const mode = localStorage.getItem("mode");
    if (mode) {
        return mode;
    }
    
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDarkMode ? "dark" : "light";
};

const initialState:ThemeModeState = {
    theme:"default",
    mode:getMode()
}
const themeModeSlice = createSlice({
    name:"themeMode",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.theme = action.payload;
        },
        setMode:(state,action)=>{
            if(state.mode === 'dark'){
                state.mode = 'light';
            } else {
                state.mode = 'dark';
            }
            localStorage.setItem("mode",state.mode);
        }
    }
})
export const {setTheme,setMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;