import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request:NextRequest, { params }:RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(request:NextRequest, { params }:RouteParams) {
    const { id } = params;
    const { name: name, username: username, email: email, password: password } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, { name, username, email, password });
    return NextResponse.json({ message: "User updated"}, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedItem = await User.findByIdAndDelete(id);
    if(!deletedItem) {
        return NextResponse.json({ message: "User not found"}, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}