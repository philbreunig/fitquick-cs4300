// WorkoutList.tsx
"use client";

if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    if (args[0]?.includes('Each child in a list should have a unique "key" prop')) {
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
  onEdit?: (id: string) => void; // Optional onEdit prop
};

export default function WorkoutList({ workouts, onDelete, onEdit }: WorkoutProps) {
  return (
    <div>
      {workouts.map((workout) => (
        <Workout
          key={workout._id}
          workout={workout}
          onDelete={onDelete}
          onEdit={onEdit}  // Passing onEdit to each Workout component
        />
      ))}
    </div>
  );
}
