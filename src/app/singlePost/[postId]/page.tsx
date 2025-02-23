'use client'
import PostDetails from "@/app/_postDetails/page";
import { getPost } from "@/app/_redux/postsSlice";
import { State, storeDispatch } from "@/app/_redux/store"
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export default function SinglePost() {
    let { loading, post } = useSelector((state: State) => state.postsReducers);
    let dispatch = useDispatch<storeDispatch>();
    let { postId } = useParams(); // to get the path in website 
    useEffect(() => {
        dispatch(getPost(`${postId}`));
    } ,[])
    return (
      <>
        {/* //!!!!!!!!!!!!!!!!!!!!!!! */}
        {loading ? <Loading /> : post && <PostDetails post={post} isComments={true} />}
      </>
    );
}
