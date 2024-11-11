import React, { useState } from "react";
import Workout from "./Workout";

type WorkoutProps = {
  workouts: {
    id: number;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }[];
};

export default function WorkoutList({ workouts }: WorkoutProps) {
  return (
    <div>
      {workouts.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
