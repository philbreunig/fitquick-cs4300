"use client";
import Image from "next/image";
import Nav from "./components/Nav";
import NonAuthSplash from "./components/NonAuthSplash";
import Signup from "./components/Signup";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const navUrl = "/SignUp";
  return (
    <div>
      <Nav username={null} url={navUrl} />
      <NonAuthSplash />
    </div>
  );
}
