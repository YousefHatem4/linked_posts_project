import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducers } from "./postsSlice";


export let store = configureStore({
    reducer: {
        authReducer,
        postsReducers
    }
})
export type State = ReturnType<typeof store.getState>;

export type storeDispatch = typeof store.dispatch;