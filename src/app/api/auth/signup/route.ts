import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongo";
import AdminModel from "@/model/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Watchman from "@kartikgangil/watchman_js";

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

        const hashed = await bcrypt.hash(password, 10);
        const newAdmin = await AdminModel.create({ email: normalizedEmail, password: hashed });

        // generate token
        const secret = process.env.JWT_SECRET || "dev_secret";
        const token = jwt.sign({ id: newAdmin._id.toString(), email: newAdmin.email }, secret, { expiresIn: "7d" });

        // try to register with watchman (best-effort)
        try {
            // @ts-ignore
            if (Watchman && typeof Watchman.register === 'function') {
                // @ts-ignore
                await Watchman.register({ id: newAdmin._id.toString(), email: newAdmin.email });
            }
        } catch (e) {
            console.warn('Watchman register failed', e);
        }

        return NextResponse.json({ success: true, token, status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Server error", status: 500 });
    }
}
