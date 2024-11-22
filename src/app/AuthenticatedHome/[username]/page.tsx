import Nav from "../../components/Nav";
import WorkoutList from "../../components/WorkoutList";
import Button from "../../components/Button";

interface Item {
  _id: string;
  workoutName: string;
  reps: number;
  sets: number;
  imageURL: string;
  notes: string;
}

interface HomeProps {
  username: string;
  workouts: Item[];
}

export default async function Home({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const signout = "/";

  const response = await fetch("http://localhost:3000/api/items");
  const data = await response.json();

  return (
    <div>
      <Nav username={username as string} url1={signout} url2={signout} />
      <Button username={username as string} />
      <WorkoutList workouts={data.items || []} />
    </div>
  );
}
