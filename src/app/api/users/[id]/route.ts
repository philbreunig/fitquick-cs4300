import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { useContext } from "react";
import { AuthContext } from "@/app/context/user";

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
    const { newWorkout } = await request.json();
    await connectMongoDB();
    const user = await User.findById(id);
    if (!user || !user.workouts) {
        return NextResponse.json({ message: "User/workouts unknown" }, { status: 400 });
    }
    user.workouts.push({
        id: newWorkout.id,
        workoutName: newWorkout.name,
        reps: newWorkout.reps,
        sets: newWorkout.sets,
        imageURL: newWorkout.imageURL,
        notes: newWorkout.notes,
    });
    try {
        await user.save();
    } catch (err) {
        console.error("Error saving user: ", err);
        return NextResponse.json({ message: "Error saving user" }, { status: 500 });
    }
    return NextResponse.json({ user }, { status: 200 });
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