"use client"
import { createContext, useEffect, useState, ReactNode } from "react";
import { NextResponse as response } from "next/server";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState(null);
    const router = useRouter();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userID");
        const storedUsername = localStorage.getItem("username");
        if (storedUserId) {
            setId(storedUserId);
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error(`Response error: ${response.status}`);
            }
            const data = await response.json();
            setId(data.user.id);
            localStorage.setItem("userID", data.user._id);
            setIsLoggedIn(true);
            localStorage.setItem("username", data.user.username);
        } catch (error) {
            console.log("Login failed.");
            alert("Username or password incorrect.");
            throw new Error("Username/password incorrect.");
        }
    };

    const logout = async () => {
        localStorage.removeItem("userID");
        setIsLoggedIn(false);
        setId(null);
        localStorage.removeItem("username");
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, id, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };