import Style from "./NonAuthSplash.module.css";
import WorkoutList from "./WorkoutList";

type WorkoutProps = {
  workouts?: {
    id: number;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }[];
};

export default function NonAuthSplash({ workouts = [] }: WorkoutProps) {
  return (
    <div className={Style.container}>
      <p className={Style.slogan}>Join Today to Get Fit Quick</p>
      <WorkoutList workouts={workouts} />
    </div>
  );
}
