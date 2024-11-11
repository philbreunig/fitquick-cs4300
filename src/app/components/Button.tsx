import { useState } from "react";
import WorkoutForm from "./WorkoutForm"; // Import the form
import "./Button.css";

export default function WorkoutApp() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide the form when X is clicked
  };

  const handleAddWorkout = (newWorkout: {
    id: number;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }) => {
    // Add workout logic (e.g., update state or send to an API)
    console.log(newWorkout);
  };

  return (
    <div className="button_container">
      <button className="styled_button" onClick={toggleFormVisibility}>
        Add Workout
      </button>

      {isFormVisible && (
        <WorkoutForm
          onAddWorkout={handleAddWorkout}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
