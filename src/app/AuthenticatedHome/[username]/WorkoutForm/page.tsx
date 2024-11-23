"use client";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import WorkoutList from "../../../components/WorkoutList";
import WorkoutForm from "../../../components/WorkoutForm";
import Style from "./page.module.css";
import { useState, useEffect } from "react";

type Workout = {
  _id: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
};

export default function Home({ params }: { params: { username: string } }) {
  const signout1 = "/";
  const signout2 = "/";
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setWorkouts(data.items || []);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const addWorkout = async (newWorkout: Omit<Workout, "_id">) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });
      if (response.ok) {
        const savedWorkout = await response.json();
        setWorkouts([...workouts, { ...newWorkout, _id: savedWorkout._id }]);
      } else {
        console.error("Failed to add workout");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const router = useRouter();
  const close = () => {
    router.push("./");
  };
  return (
    <div>
      <Nav username={username as string} url1={signout1} url2={signout2} />
      <div className={Style.container}>
        <WorkoutList workouts={workouts} />
        <WorkoutForm onAddWorkout={addWorkout} onClose={close} />
      </div>
    </div>
  );
}
