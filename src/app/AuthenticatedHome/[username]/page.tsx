// Home.tsx (Authorized User Version)
"use client";

import styles from "./Page.module.css";
import Nav from "../../components/Nav";
import WorkoutList from "../../components/WorkoutList";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../context/user";

interface Item {
  _id: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}

interface HomeProps {
  username: string;
  workouts: Item[];
}

export default function Home({ params }: { params: { username: string } }) {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext null.");
  const { isLoggedIn, logout } = context;

  const signout = "/";
  const [workouts, setWorkouts] = useState<Item[]>([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items");
        const data = await response.json();
        setWorkouts(data.items || []);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setWorkouts(workouts.filter((workout) => workout._id !== id));
      } else {
        console.error("Failed to delete workout");
      }
    } catch (error) {
      console.error("Error deleting workout: ", error);
    }
  };

  // Function to handle the Edit action (for demonstration purposes, just log)
  const handleEdit = (id: string) => {
    console.log("Editing workout with id:", id);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Nav
        username={username as string}
        url1={signout}
        url2={signout}
        handleLogout={handleSignOut}
      />
      <Button username={username as string} />
      <WorkoutList
        workouts={workouts}
        onDelete={deleteWorkout}
        onEdit={handleEdit}
      />
    </div>
  );
}
