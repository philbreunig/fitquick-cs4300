"use client";
import { useParams } from "next/navigation";
import Nav from "../../components/Nav";
import { useState } from "react";

export default function Home() {
  const { username } = useParams();
  const signout = "/";
  return (
    <div>
      <Nav username={username as string} url={signout} />
    </div>
  );
}
