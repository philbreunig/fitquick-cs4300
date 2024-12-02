"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
  const { isLoggedIn, logout, username } = context;

  const [workout, setWorkout] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchWorkout = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`);
        const data = await response.json();
        setWorkout(data.item);
      } catch (error) {
        console.error("Failed to fetch workout: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleUpdateWorkout = async (editedWorkout: Item) => {
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
        Router.push("/");
      } else {
        console.error("Failed to update workout");
      }
    } catch (error) {
      console.error("Error updating workout: ", error);
    }
  };

  const handleClose = () => {
    Router.push("/");
  };

  if (loading) {
    return <div>Loading workout...</div>;
  }

  return (
    <div>
      {workout && (
        <EditWorkoutForm
          originalWorkout={workout}
          onSaveEdits={handleUpdateWorkout}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
