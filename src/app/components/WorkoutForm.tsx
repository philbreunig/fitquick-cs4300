import { useContext, useState } from "react";
import "./WorkoutForm.css";
import { AuthContext } from "../context/user";

type WorkoutProps = {
  onAddWorkout: (workout: {
    userID: string;
    workoutName: string;
    reps: number;
    sets: number;
    imageURL: string;
    notes: string;
  }) => void;
  onClose: () => void;
};

export default function AddWorkout({ onAddWorkout, onClose }: WorkoutProps) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext null");
  const { id } = context;

  const [workoutName, setWorkoutName] = useState("");
  const [reps, setReps] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);
  const [imageURL, setImageURL] = useState("");
  const [notes, setNotes] = useState("");
  const [userID, setUserID] = useState(id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutName || !reps || !sets) {
      alert("Name, Reps, and Sets Required");
      return;
    }

    const newWorkout = {
      userID,
      workoutName,
      reps,
      sets,
      imageURL: imageURL || "",
      notes: notes || "",
    };
    onAddWorkout(newWorkout);

    setWorkoutName("");
    setReps(0);
    setSets(0);
    setImageURL("");
    setNotes("");
    setUserID("");
  };

  return (
    <div className="pageBackground">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <button type="button" className="closeButton" onClick={onClose}>
            X
          </button>
          <div>
            <input
              type="text"
              placeholder="Workout Name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="submit">Add Workout</button>
        </form>
      </div>
    </div>
  );
}
