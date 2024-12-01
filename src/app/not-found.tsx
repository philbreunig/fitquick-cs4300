"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Style from "./not-found.module.css";
import { title } from "process";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>404 - Page not found</h1>
      <p className={Style.errorMessage}>
        The page you are looking for does not exist
      </p>
      <p className={Style.routingMessage}>
        You will be redirected to the homepage shortly
      </p>
    </div>
  );
}
