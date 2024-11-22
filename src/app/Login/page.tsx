"use client";
import Nav from "../components/Nav";
import Login from "../components/Login";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const handleLogin = (user: { username: string }) => {
    setUsername(user.username);
  };
  const signUpURL = "/SignUp";
  const loginURL = "/Login";
  return (
    <div>
      <Nav username={null} url1={signUpURL} url2={loginURL} />
      <Login onLogin={handleLogin} />
    </div>
  );
}
