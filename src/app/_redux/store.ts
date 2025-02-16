import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";


export let store = configureStore({
    reducer: {
        authReducer
    }
})
export type State = ReturnType<typeof store.getState>