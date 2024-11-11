"use client";
import Image from "next/image";
import Nav from "../components/Nav";
import NonAuthSplash from "../components/NonAuthSplash";
import Signup from "../components/Signup";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const navUrl = "/SignUp";
  const [users, setUsers] = useState<any[]>([]);
  const addNewUser = (newUser: {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    setUsers([...users, newUser]);
    console.log("New user added: ", newUser);
  };
  return (
    <div>
      <Nav username={null} url={navUrl} />
      <Signup onAddUser={addNewUser} />
    </div>
  );
}
