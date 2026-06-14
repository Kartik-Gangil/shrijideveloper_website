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
            return NextResponse.json({ error: "Missing credentials", status: 400 });
        }

        const admin = await AdminModel.findOne({ email: email.trim().toLowerCase() });
        if (!admin) {
            return NextResponse.json({ error: "Invalid credentials", status: 401 });
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return NextResponse.json({ error: "Invalid credentials", status: 401 });
        }

        // create JWT token
        const secret = process.env.JWT_SECRET || "dev_secret";
        const token = jwt.sign({ id: admin._id.toString(), email: admin.email }, secret, { expiresIn: "7d" });

        // if Watchman provides a session helper, try to register session (best-effort)
        try {
            // @ts-ignore
            if (Watchman && typeof Watchman.createSession === 'function') {
                // @ts-ignore
                await Watchman.createSession({ userId: admin._id.toString(), email: admin.email, token });
            }
        } catch (e) {
            // ignore watchman errors
            console.warn('Watchman session create failed', e);
        }

        return NextResponse.json({ success: true, token, status: 200 });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Server error", status: 500 });
    }
}
