"use client";

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
