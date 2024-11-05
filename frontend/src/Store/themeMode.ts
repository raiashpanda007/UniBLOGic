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
            if(state.mode === 'dark'){
                state.mode = 'light';
            } else {
                state.mode = 'dark';
            }
        }
    }
})
export const {setTheme,setMode} = themeModeSlice.actions;
export default themeModeSlice.reducer;