"use client";
import { useContext, useEffect, useState } from "react";
import Nav from "./components/Nav";
import NonAuthSplash from "./components/NonAuthSplash";
import { AuthContext } from "./context/user";
import Button from "./components/Button";
import WorkoutList from "./components/WorkoutList";
import styles from "./Page.module.css";

interface Item {
  _id: string;
  userID: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}

export default function Home() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context null.");
  const { isLoggedIn, id, logout, username } = context;

  const [workouts, setWorkouts] = useState<Item[]>([]);
  const [myWorkouts, setMyWorkouts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const signUpURL = "/SignUp";
  const loginURL = "/Login";
  const signout = "/";

  useEffect(() => {
    const loginStatus = async () => {};
    loginStatus();
  }, []);

  /* Only for if user array is working
  useEffect(() => {
    const fetchMyWorkouts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const data = await response.json();
        setMyWorkouts(data.workouts || []);
      } catch (error) {
        console.error("Failed to fetch my workouts: ", error);
      }
    };
  });
  */

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
    <div>
      {!isLoggedIn && (
        <div>
          <Nav username={null} url1={signUpURL} url2={loginURL} />
          <NonAuthSplash workouts={workouts} />
        </div>
      )}

      {isLoggedIn && (
        <div className={styles.container}>
          <Nav
            username={username as string}
            url1={signout}
            url2={signout}
            handleLogout={handleSignOut}
          />
          <Button username={username as string} />
          {loading ? (
            <p>Loading workouts...</p>
          ) : (
            <WorkoutList
              workouts={workouts}
              onDelete={deleteWorkout}
              onEdit={handleEdit}
            />
          )}
        </div>
      )}
    </div>
  );
}
