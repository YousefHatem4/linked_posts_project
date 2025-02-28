"use client";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispatch } from "../_redux/store";
import { useEffect } from "react";
import { getUserPosts } from "../_redux/postsSlice";
import { jwtDecode } from "jwt-decode";
import Loading from "@/app/loading";
import PostDetails from "../_postDetails/page";

export default function Profile() {
  const { loading, posts } = useSelector((state: State) => state.postsReducers);
  const dispatch = useDispatch<storeDispatch>();
  const x = jwtDecode(`${localStorage.getItem("token")}`); // to destruct token of the user
  const postReverse = [...posts];

  useEffect(() => {
    dispatch(getUserPosts(x.user));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        postReverse.map((post) => (
          <PostDetails key={post._id} post={post} isComments={true} />
        ))
      )}
    </>
  );
}
