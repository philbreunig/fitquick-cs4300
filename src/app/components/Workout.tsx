import Image from "next/image";
import Card from "./Card";
import styles from "./Workout.module.css";

type WorkoutProps = {
  workout: {
    id: number;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  };
};

export default function Workout({ workout }: WorkoutProps) {
  return (
    <Card className={styles.workout_card}>
      <img
        src={workout.imageURL}
        alt={workout.workoutName}
        className={styles.workout_image}
      />
      <div className={styles.workout_details}>
        <div className={styles.workout_name}>{workout.workoutName}</div>
        <div className={styles.workout_stats}>
          Sets: {workout.sets} | Reps: {workout.reps}
        </div>
        <div className={styles.workout_notes}>{workout.notes}</div>
      </div>
    </Card>
  );
}
