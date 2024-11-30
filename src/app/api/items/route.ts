import { AuthContext } from "@/app/context/user";
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/ItemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { useContext } from "react";

export async function POST(request: NextRequest) {
  const { userID, workoutName, reps, sets, imageURL, notes } = await request.json();
  if (!userID || !workoutName || !reps || !sets) {
    return NextResponse.json(
      { message: "Missing required fields: userID, workoutName, reps, sets" },
      { status: 400 }
    );
  }
  await connectMongoDB();
  await Item.create({ userID, workoutName, reps, sets, imageURL, notes });
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
