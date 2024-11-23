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

import Workout from "./Workout";

type WorkoutProps = {
  workouts: {
    _id: string;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }[];
  onDelete?: (id: string) => void;
};

export default function WorkoutList({ workouts, onDelete }: WorkoutProps) {
  return (
    <div>
      {workouts.map((workout) => (
        <Workout key={workout._id} workout={workout} onDelete={onDelete} />
      ))}
    </div>
  );
}
