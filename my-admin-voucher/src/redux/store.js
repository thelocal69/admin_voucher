import { configureStore } from "@reduxjs/toolkit";import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import AuthReducer from './feature/authSlice';
import {persistReducer} from "redux-persist";

const reducers = combineReducers({
    auth: AuthReducer
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