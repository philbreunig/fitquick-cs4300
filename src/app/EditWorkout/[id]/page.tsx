"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation"; // Use from next/navigation for app directory
import EditWorkoutForm from "../../components/EditWorkoutForm";
import { AuthContext } from "../../context/user";

interface Item {
  _id: string;
  userID: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}

export default function EditWorkoutPage() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context null.");
  const { isLoggedIn, id, logout, username } = context;

  const [workout, setWorkout] = useState<Item | null>(null); // Changed to single workout object
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  const { workoutId } = useParams(); // Get workoutId from URL params

  useEffect(() => {
    if (!workoutId) return;

    const fetchWorkout = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/items/${workoutId}`
        );
        const data = await response.json();
        setWorkout(data); // Set single workout instead of an array
      } catch (error) {
        console.error("Failed to fetch workout: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  // Handle workout update (PUT request)
  const handleUpdateWorkout = async (editedWorkout: Omit<Item, "_id">) => {
    if (!workout) return;

    try {
      const response = await fetch(`/api/items/${workout._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedWorkout),
      });

      if (response.ok) {
        Router.push("/home"); // Redirect to home or another page after successful update
      } else {
        console.error("Failed to update workout");
      }
    } catch (error) {
      console.error("Error updating workout: ", error);
    }
  };

  // Handle close (navigate back or set workout to null)
  const handleClose = () => {
    Router.push("/home"); // Redirect back to home or any other page
  };

  return (
    <div>
      {
        <EditWorkoutForm
          originalWorkout={workout} // Pass the single workout object
          onSaveEdits={handleUpdateWorkout}
          onClose={handleClose}
        />
      }
    </div>
  );
}