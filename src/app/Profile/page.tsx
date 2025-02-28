"use client";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispatch } from "../_redux/store";
import { useEffect, useMemo } from "react";
import { getUserPosts } from "../_redux/postsSlice";
import { jwtDecode } from "jwt-decode";
import Loading from "@/app/loading";
import PostDetails from "../_postDetails/page";

export default function Profile() {
  const { loading, posts } = useSelector((state: State) => state.postsReducers);
  const dispatch = useDispatch<storeDispatch>();

  // Memoize the decoded token to prevent unnecessary re-renders
  const x = useMemo(() => jwtDecode(`${localStorage.getItem("token")}`), []);

  const postReverse = [...posts];

  useEffect(() => {
    if (x?.user) {
      dispatch(getUserPosts(x.user));
    }
  }, [dispatch, x]); // Include `dispatch` and `x` in the dependency array

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
