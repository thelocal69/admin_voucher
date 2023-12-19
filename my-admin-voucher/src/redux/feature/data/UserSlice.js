import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: ""
}

export const userData = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userPayload:(state, action) => {
            state.email = action.payload;
        },
        removeUserPayload: (state) =>{
            state.email = "";
        }
    },
    extraReducers: (builder) =>{}
});

export const {userPayload, removeUserPayload} = userData.actions;

export default userData.reducer;