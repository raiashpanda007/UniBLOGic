import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    loadingMsg: "",
};
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoadingMsg: (state, action) => {
            state.loadingMsg = action.payload;
        }

    },
    });

export const { setLoading,setLoadingMsg } = loadingSlice.actions;
export default loadingSlice.reducer;