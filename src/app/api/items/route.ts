import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/ItemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { workoutName, reps, sets, imageURL, notes } = await request.json();
  await connectMongoDB();
  await Item.create({ workoutName, reps, sets, imageURL, notes });
  return NextResponse.json(
    { message: "Item added successfully" },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const items = await Item.find();
  return NextResponse.json({ items });
}
