import { useState, useContext, useEffect, use } from "react";
import "./WorkoutForm.css"
import { AuthContext } from "../context/user"

type EditWorkoutProps = {
    originalWorkout: {
        _id: string;
        userID: string;
        workoutName: string;
        reps: number;
        sets: number;
        imageURL: string;
        notes: string;
    };
    onSaveEdits: (editedWorkout: {
        _id: string;
        workoutName: string;
        reps: number;
        sets: number;
        imageURL: string;
        notes: string;
    }) => void;
    onClose: () => void;
};

export default function EditWorkoutForm({ originalWorkout, onSaveEdits, onClose }: EditWorkoutProps) {
    const context = useContext(AuthContext)
    if (!context) throw new Error("AuthContext null");

    const [workoutData, setWorkoutData] = useState(originalWorkout);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!originalWorkout) return;
         
        if (!workoutData || !workoutData._id) {
            setLoading(true);

            const fetchWorkout = async (id: string) => {
                try {
                    const response = await fetch(`/api/workouts/${id}`);
                    if(!response.ok) {
                        throw new Error("Failed to fetch workout data");
                    }
                    const data = await response.json();
                    setWorkoutData(data);
                } catch (err) {
                    setError("Error fetching workout data");
                } finally {
                    setLoading(false);
                }
            };
            fetchWorkout(originalWorkout._id);
        }
    }, [originalWorkout])

    const { workoutName, reps, sets, imageURL, notes, _id} = originalWorkout;
    const [newWorkoutName, setNewWorkoutName] = useState(workoutName);
    const [newReps, setNewReps] = useState(reps);
    const [newSets, setNewSets] = useState(sets);
    const [newImageURL, setNewImageURL] = useState(imageURL);
    const [newNotes, setNewNotes] = useState(notes);

    const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (!newWorkoutName || !newReps || !newSets) {
        alert("Workout Name/Reps/Sets are required!")
        return;
       }

    const newWorkout = {
        _id,
        workoutName: newWorkoutName,
        reps: newReps,
        sets: newSets,
        imageURL: newImageURL,
        notes: newNotes,
    };

    onSaveEdits(newWorkout);
    onClose();
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
              value={newWorkoutName}
              onChange={(e) => setNewWorkoutName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Reps"
              value={newReps}
              onChange={(e) => setNewReps(Number(e.target.value))}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Sets"
              value={newSets}
              onChange={(e) => setNewSets(Number(e.target.value))}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Image URL"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Notes"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

