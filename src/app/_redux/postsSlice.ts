import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";



let initialState = {
    loading: false as Boolean,
    posts: [] as Post[], // posts of interfaces | i transform json to typescript of api and put it in interfaces.ts | for post page
    post:null as Post|null,    // post for post details  | null 3a4an fe elawel haygeb en elpost be null w ba3den yegeb eldata
    error: null as any
}

export let getPosts = createAsyncThunk('posts/getPosts', async () => { // posts -> the object up | getPosts -> the name of variable
    let response = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`, // ely rage3 ye7oto gowa string 
            'Content-Type' : 'application/json' // must write this code 
        },
    })
    let data = await response.json(); // transform it to json agian
    console.log(data.posts)
    return data.posts; // api : in data you find the posts you want
}) 


 export let getPost = createAsyncThunk('posts/getPost', async (postId: string) => {
    let response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`, // ely rage3 ye7oto gowa string 
            'Content-Type' : 'application/json' // must write this code 
        },
    })
     let data = await response.json(); // transform it to json agian
     console.log(data.post);
    return data.post; // api : in data you find the posts you want
 }) 


  export let getUserPosts = createAsyncThunk('posts/getUserPosts', async (userId: string) => { 
    let response = await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts?`, {
        method: 'GET',
        headers: {
            'token': `${localStorage.getItem('token')}`, // ely rage3 ye7oto gowa string 
            'Content-Type' : 'application/json' // must write this code 
        },
    })
      let data = await response.json(); // transform it to json agian
      console.log(data.posts);
      
    return data.posts; // api : in data you find the posts you want
  })
 


let postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;  // in refresh for example make the laoding works
        })

           builder.addCase(getPosts.fulfilled, (state , action) => {
               state.loading = false;
               state.posts = action.payload; // the action when for example click on button 
           })
        
        builder.addCase(getPosts.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload; // the action when there is error 
        })

        //! handle the cases of post details
        builder.addCase(getPost.pending, (state) => {
            state.loading = true;  // in refresh for example make the laoding works
        })

           builder.addCase(getPost.fulfilled, (state , action) => {
               state.loading = false;
               state.post = action.payload; // the action when for example click on button 
           })
        
        builder.addCase(getPost.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload; // the action when there is error 
        })
        

        //!handle the cases of user posts
           builder.addCase(getUserPosts.pending, (state) => {
            state.loading = true;  // in refresh for example make the laoding works
        })

           builder.addCase(getUserPosts.fulfilled, (state , action) => {
               state.loading = false;
               state.posts = action.payload; // the action when for example click on button 
           })
        
        builder.addCase(getUserPosts.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload; // the action when there is error 
        })
    },
})

export let postsReducers = postSlice.reducer;
