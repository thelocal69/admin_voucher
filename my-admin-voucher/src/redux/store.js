import { configureStore } from "@reduxjs/toolkit";import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import AuthReducer from './feature/authen/authSlice';
import UserSlice from "./feature/data/UserSlice";
import {persistReducer} from "redux-persist";

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserSlice
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer
});

export default store;