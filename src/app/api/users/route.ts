import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { name, username, email, password } = await request.json();
  await connectMongoDB();
  await User.create({ name, username, email, password });
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
