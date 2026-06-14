import UserModel from "@/model/User";
import { connectToDatabase } from "@/utils/mongo"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const user = await UserModel.find()
        return NextResponse.json({
            user,
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to create user", status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const newUser = await UserModel.create({
            name: body.name,
            phone: body.phone,
        });
        return NextResponse.json({
            newUser,
            status: 201,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Failed to create user", status: 500 });
    }
}