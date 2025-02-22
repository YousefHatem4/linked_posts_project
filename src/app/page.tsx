"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { State, storeDispatch } from "./_redux/store";
import { getPosts, postsReducers } from "./_redux/postsSlice";
import PostDetails from "./_postDetails/page";

export default function Home() {
  let router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  let { loading , posts } = useSelector((state: State) => state.postsReducers) // distruct loading, posts from postsslice

  let dispatch = useDispatch<storeDispatch>(); // you must write no3 eldispatch
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // if there is not token enter login otherwise make loading until loading finishs
      router.push("/login");
    } else {
      setIsLoading(false);
      dispatch(getPosts());
    }
  }, []);

  return (
    <>
      {isLoading || loading ? (
        <Loading />
      ) : (
        posts.map((post) => <PostDetails key={post.id} post={post} />)
      )}
    </>
  );
}
