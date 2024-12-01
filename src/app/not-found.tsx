"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>The page you are looking for does not exist</p>
      <p>You will be redirected to the homepage shortly</p>
    </div>
  );
}
