import { State, store } from './store';
import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { boolean } from "yup";


let initialState = { token: localStorage.getItem('token') as null | string, isLoading: false as boolean, error: null as null | string };


let authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setToken: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            toast.success(action.payload.message)
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload, {
                duration:2000
            })
        },
         removeToken: (state) => {
             state.token = null;
             localStorage.removeItem('token')
        }

    }
})
export let authReducer = authSlice.reducer;
export let {setLoading,setToken,setError,removeToken} = authSlice.actions