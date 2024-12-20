"use client";
import { useParams, useRouter } from "next/navigation";
import Nav from "../components/Nav";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";
import Style from "./page.module.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/user";

type Workout = {
  _id: string;
  userID: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
};

export default function Home() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext null");
  const { isLoggedIn, id, logout, username } = context;

  const signout1 = "/";
  const signout2 = "/";
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/items");
        const data = await response.json();
        setWorkouts(data.items || []);
      } catch (error) {
        console.error("Failed to fetch workouts: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [isLoggedIn, id]);

  const addWorkout = async (newWorkout: Omit<Workout, "_id">) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      });

      if (!response.ok) {
        throw new Error("Failed to add workout");
      }
      /* TRYING TO ADD TO USER ARRAY ON SUBMIT
      const savedWorkout = await response.json();

      const addToUserResponse = await fetch(
        `http://localhost:3000/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newWorkout: savedWorkout,
          }),
        }
      );

      if (!addToUserResponse.ok) {
        throw new Error(`Response status: ${addToUserResponse.status}`);
      }

      const data = await addToUserResponse.json();
      setWorkouts([...workouts, savedWorkout]);
      router.push("/"); */
    } catch (err) {
      console.error("Error adding workout to user:", err);
    }
  };

  const close = () => {
    router.push("./");
  };
  const handleSignOut = () => {
    logout();
  };

  return (
    <div>
      <Nav
        username={username as string}
        url1={signout1}
        url2={signout2}
        handleLogout={handleSignOut}
      />
      <div className={Style.container}>
        {loading ? (
          <p>Loading workouts...</p>
        ) : (
          <WorkoutList workouts={workouts} />
        )}
        <WorkoutForm onAddWorkout={addWorkout} onClose={close} />
      </div>
    </div>
  );
}
