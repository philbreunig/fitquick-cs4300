import Style from "./NonAuthSplash.module.css";
import WorkoutList from "./WorkoutList";

type WorkoutProps = {
  workouts?: {
    _id: string;
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
      <p className={Style.description}>
        Create an account or login to customize your own workout plans
      </p>
    </div>
  );
}
