"use client";
import Image from "next/image";
import Nav from "../components/Nav";
import NonAuthSplash from "../components/NonAuthSplash";
import Signup from "../components/Signup";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../context/user";
import { useRouter } from "next/navigation";

interface Workout {
  id: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}

type User = {
  _id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  workouts: Workout[];
};

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
        setUsers([...users, { ...newUser, _id: savedUsers.user._id }]);
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  if (isLoggedIn) {
    return null;
  }
  return (
    <div>
      <Nav username={null} url1={signUpUrl} url2={loginUrl} />
      <Signup onAddUser={addNewUser} />
    </div>
  );
}
