"use client";
import Image from "next/image";
import Nav from "../components/Nav";
import NonAuthSplash from "../components/NonAuthSplash";
import Signup from "../components/Signup";
import { useState } from "react";
import Link from "next/link";

type User = {
  _id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function Home() {
  const signUpUrl = "/SignUp";
  const loginUrl = "/Login";
  const [users, setUsers] = useState<any[]>([]);

  const addNewUser = async (newUser: Omit<User, "_id">) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const savedUsers = await response.json();
        setUsers([...users, { ...newUser, _id: savedUsers._id }]);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <Nav username={null} url1={signUpUrl} url2={loginUrl} />
      <Signup onAddUser={addNewUser} />
    </div>
  );
}
