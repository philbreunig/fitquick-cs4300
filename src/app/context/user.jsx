"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUserId = localStorage.getItem("userID");
        const storedUsername = localStorage.getItem("username");
        const storedLogIn = localStorage.getItem("isLoggedIn");

        if (storedUserId && storedUsername && storedLogIn) {
          setId(storedUserId);
          setIsLoggedIn(JSON.parse(storedLogIn));
          setUsername(storedUsername);
        } else {
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        alert("Username or password incorrect.");
        return;
      }
      const data = await response.json();
      setId(data.user.id);
      setIsLoggedIn(true);
      setUsername(data.user.username);

      try {
        localStorage.setItem("userID", data.user._id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    } catch (error) {

    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("userID");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }

    setIsLoggedIn(false);
    setId(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, id, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };