"use client";

import { useState } from "react";
import WorkoutForm from "./WorkoutForm";
import "./Button.css";
import { useRouter } from "next/navigation";

type ButtonProps = {
  username: String;
};

export default function WorkoutApp({ username }: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/AddWorkout`);
  };
  return (
    <div className="button_container">
      <button className="styled_button" onClick={handleClick}>
        Add Workout
      </button>
    </div>
  );
}
