import connectMongoDB from "@/libs/mongodb";
import User from "../../../models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const bcrypt = require('bcrypt');

export  async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "Username incorrect."}, { status: 400 });
    }
    const dbpass = user.password;
    const isMatch = await bcrypt.compare(password, dbpass);
    if (!isMatch) {
        return NextResponse.json({ message: "Password incorrect."}, { status: 400 });
    }
    const { password: _, ...userData } = user.toObject();
    return NextResponse.json({ message: "Login authenticated.", user: userData }, { status: 200 });
}