import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, username, email, password, workouts } = await request.json();
  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 5);
  await User.create({ name, username, email, password: hashedPassword, workouts });
  return NextResponse.json(
    { message: "User added successfully" },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}
