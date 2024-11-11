import Style from "./Signup.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SignupProps = {
  onAddUser: (user: {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
  }) => void;
};

export default function Signup({ onAddUser }: SignupProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and Password are required");
      return;
    } else if (username.includes(" ")) {
      alert("Username cannot contain spaces");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: "",
      username: "",
      email: "",
      password: "",
    };
    onAddUser(newUser);
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setId("");
    router.push("/Login");
  };
  return (
    <div className={Style.background}>
      <div className={Style.container}>
        <div className={Style.header}>
          <p className={Style.text}>Sign-up</p>
          <div className={Style.underline}></div>
        </div>
        <form className={Style.inputs} onSubmit={handleSubmit}>
          <div className={Style.input}>
            <img src="user-icon.png" alt="User Icon" className={Style.icon} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              className={Style.inputField}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
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
            <img src="email-icon.png" alt="Email" className={Style.icon} />
            <input
              type="email"
              placeholder="Email"
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
            <Link href="./Login">Have an account? Login.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
