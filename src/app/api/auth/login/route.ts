import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import AdminModel from "@/model/Admin";

import { comparePassword, GenToken } from "@kartikgangil/watchman_js";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials", status: 400 });
        }

        const admin = await AdminModel.findOne({ email: email.trim().toLowerCase() });
        if (!admin) {
            return NextResponse.json({ error: "Invalid credentials", status: 401 });
        }
        const match = await comparePassword(password, admin.password);
        if (!match) {
            return NextResponse.json({ error: "Invalid credentials", status: 401 });
        }

        // create JWT token
        const secret = process.env.JWT_SECRET || "dev_secret";
        const token = await GenToken({ id: admin._id.toString(), email: admin.email }, { expiresIn: '7d' }, secret);
        console.log('Generated login token:', token);

        return NextResponse.json({ success: true, token, status: 200 });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Server error", status: 500 });
    }
}
