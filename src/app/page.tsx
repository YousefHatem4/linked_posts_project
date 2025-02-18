"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  let router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // if there is not token enter login otherwise make loading until loading finishs 
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Loading /> : <h1>home page</h1>}</>;
}
