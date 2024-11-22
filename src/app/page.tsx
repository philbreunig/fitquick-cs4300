import Nav from "./components/Nav";
import NonAuthSplash from "./components/NonAuthSplash";

interface Item {
  _id: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}
interface HomeProps {
  workouts: Item[];
}

export default async function Home({ workouts }: HomeProps) {
  const signUpURL = "/SignUp";
  const loginURL = "/Login";

  const response = await fetch("http://localhost:3000/api/items");
  const data = await response.json();

  return (
    <div>
      <Nav username={null} url1={signUpURL} url2={loginURL} />
      <NonAuthSplash workouts={data.items || []} />
    </div>
  );
}
