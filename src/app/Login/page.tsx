"use client";
import Nav from "../components/Nav";
import Login from "../components/Login";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const handleLogin = (user: { username: string }) => {
    setUsername(user.username);
  };
  const create = "/SignUp";
  return (
    <div>
      <Nav username={username} url={create} />
      <Login onLogin={handleLogin} />
    </div>
  );
}
