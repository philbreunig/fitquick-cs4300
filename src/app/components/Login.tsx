"use client";
import Style from "./Login.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginProps = {
  onLogin: (user: { username: string }) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and Password are required");
      return;
    }
    if (username.includes(" ")) {
      alert("Username cannot include spaces");
      return;
    }
    onLogin({ username });
    setUsername("");
    setPassword("");
    router.push(`/AuthenticatedHome/${username}`);
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
              value={username}
              className={Style.inputField}
              onChange={(e) => setUsername(e.target.value)}
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
