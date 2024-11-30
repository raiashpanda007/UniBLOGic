import { createSlice } from "@reduxjs/toolkit";

interface LoginStatusState {
  userStatus: boolean;
  user: {
    username: string;
    verified: boolean;
    email: string;
    branch: string;
    batch: number;
  };
}

// Helper to save state to local storage
const saveToLocalStorage = (state: LoginStatusState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("loginStatus", serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Helper to load state from local storage
const loadFromLocalStorage = (): LoginStatusState => {
  try {
    const serializedState = localStorage.getItem("loginStatus");
    if (serializedState === null) {
      return {
        userStatus: true,
        user: {
          username: "",
          verified: false,
          email: "",
          branch: "",
          batch: 0,
        },
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return {
      userStatus: true,
      user: {
        username: "",
        verified: false,
        email: "",
        branch: "",
        batch: 0,
      },
    };
  }
};

// Load the initial state from local storage
const initialState: LoginStatusState = loadFromLocalStorage();

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
      saveToLocalStorage(state); // Save updated state to local storage
    },
    setUser: (state, action) => {
      state.user = action.payload;
      saveToLocalStorage(state); // Save updated state to local storage
    },
  },
});

export const { setUserStatus, setUser } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;
