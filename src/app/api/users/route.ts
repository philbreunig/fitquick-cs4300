import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, username, email, password, workouts } = await request.json();
  await connectMongoDB();
  const existingUser = await User.findOne({ email });
  const existingUser2 = await User.findOne({ username });
  if (existingUser || existingUser2) {
    return NextResponse.json(
        { message: "User is already registered."},
        { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    workouts,
  });
  console.log(newUser._id);
  return NextResponse.json(
    { message: "User added successfully", userId: newUser._id },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}
