import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import AdminModel from "@/model/Admin";
import { GenToken, hashPassword } from "@kartikgangil/watchman_js";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields", status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existing = await AdminModel.findOne({ email: normalizedEmail });
        if (existing) {
            return NextResponse.json({ error: "Admin already exists", status: 409 });
        }

        const hashed = await hashPassword(password);
        const newAdmin = await AdminModel.create({ email: normalizedEmail, password: hashed });

        // generate token
        const secret = process.env.JWT_SECRET || "dev_secret";
        const token = await GenToken({ id: newAdmin._id.toString(), email: newAdmin.email }, { expiresIn: "7d" }, secret);
        console.log('Generated signup token:', token);

        return NextResponse.json({ success: true, token, status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Server error", status: 500 });
    }
}
