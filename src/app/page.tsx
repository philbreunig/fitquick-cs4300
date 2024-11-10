import Image from "next/image";
import Nav from "./components/Nav";
import NonAuthSplash from "./components/NonAuthSplash";

export default function Home() {
  return (
    <div>
      <Nav />
      <NonAuthSplash />
    </div>
  );
}
