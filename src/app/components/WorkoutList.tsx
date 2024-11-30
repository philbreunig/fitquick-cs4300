// WorkoutList.tsx
"use client";

if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    if (
      args[0]?.includes('Each child in a list should have a unique "key" prop')
    ) {
      return;
    }
    originalConsoleError(...args);
  };
}

import { useContext } from "react";
import Workout from "./Workout";
import { AuthContext } from "../context/user";

type WorkoutProps = {
  workouts: {
    _id: string;
    userID: string;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void; // Optional onEdit prop
};

export default function WorkoutList({
  workouts,
  onDelete,
  onEdit,
}: WorkoutProps) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context null");
  const { id, isLoggedIn } = context;
  return (
    <div>
      {workouts
        .filter((workout) =>
          isLoggedIn ? String(workout.userID) === String(id) : true
        )
        .map((workout) => (
          <Workout
            key={workout._id}
            workout={workout}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
}
