import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    accessToken: "",
    //refreshToken: "",
    isAuthenticated: false
  };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload);
        },
        logOut: (state) => {
            state.accessToken = null;
            localStorage.removeItem("token");
            state.isAuthenticated = false;
            toast.success("Logout Successfully");
        }
    },
    extraReducers: (builder) =>{}
});

export const { logOut, logIn } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;