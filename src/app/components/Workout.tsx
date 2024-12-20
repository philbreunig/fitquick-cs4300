// Workout.tsx
"use client";
import Image from "next/image";
import Card from "./Card";
import styles from "./Workout.module.css";

type WorkoutProps = {
  workout: {
    _id: string;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  };
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export default function Workout({ workout, onDelete, onEdit }: WorkoutProps) {
  const handleDelete = () => {
    if (onDelete) onDelete(workout._id);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(workout._id); // Trigger the onEdit function if it exists
  };
  const showDeleteButton = onDelete && typeof onDelete === "function";

  return (
    <Card
      className={`${styles.workout_card} ${
        showDeleteButton ? styles.withButton : ""
      }`}
    >
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
      <div className={styles.workout_buttons}>
        {onDelete && (
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete Workout
          </button>
        )}
        {onEdit && (
          <button onClick={handleEdit} className={styles.editButton}>
            Edit Workout
          </button>
        )}
      </div>
    </Card>
  );
}
