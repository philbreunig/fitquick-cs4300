"use client";

import Nav from "../../components/Nav";
import WorkoutList from "../../components/WorkoutList";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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

  return (
    <div>
      <Nav username={username as string} url1={signout} url2={signout} />
      <Button username={username as string} />
      <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
    </div>
  );
}
