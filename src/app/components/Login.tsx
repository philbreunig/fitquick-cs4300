"use client";
import Style from "./Login.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/user";

type LoginProps = {
  onLogin: (user: { username: string }) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext null");
  }
  const { isLoggedIn, login } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        alert("Email and Password are required");
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      await login(email, password);
      router.push(`/AuthenticatedHome/${email}`);
    } catch (err) {
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className={Style.background}>
      <div className={Style.container}>
        <div className={Style.header}>
          <p className={Style.text}>Log in</p>
          <div className={Style.underline}></div>
        </div>
        <form className={Style.inputs} onSubmit={handleSubmit}>
          <div className={Style.input}>
            <img src="user-icon.png" alt="User Icon" className={Style.icon} />
            <input
              type="text"
              placeholder="Username"
              value={email}
              className={Style.inputField}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className={Style.input}>
            <img
              src="password-icon.png"
              alt="Password"
              className={Style.icon}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className={Style.inputField}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className={Style.buttonAndLink}>
            <button className={Style.submitButton} type="submit">
              Submit
            </button>
            <Link href="./SignUp">No account? Sign Up.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
