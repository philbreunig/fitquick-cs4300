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
};

export default function WorkoutList({ workouts }: WorkoutProps) {
  return (
    <div>
      {workouts.map((workout) => (
        <Workout key={workout._id} workout={workout} />
      ))}
    </div>
  );
}
