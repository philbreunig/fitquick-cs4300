"use client";
import Nav from "../components/Nav";
import Login from "../components/Login";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/user";
import { useRouter } from "next/navigation";

export default function Home() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext null");
  const { isLoggedIn } = context;

  const [username, setUsername] = useState<string | null>(null);
  const handleLogin = (user: { username: string }) => {
    setUsername(user.username);
  };
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const signUpURL = "/SignUp";
  const loginURL = "/Login";

  if (isLoggedIn) {
    return null;
  }
  return (
    <div>
      <Nav username={null} url1={signUpURL} url2={loginURL} />
      <Login onLogin={handleLogin} />
    </div>
  );
}
