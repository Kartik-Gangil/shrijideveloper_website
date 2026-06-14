'use server';

import UserModel from "@/model/User";
import { connectToDatabase } from "@/utils/mongo";
import { redirect } from 'next/navigation';

export async function bookVisit(formData: FormData) {
    const name = formData.get('name');
    const phone = formData.get('phone');

    await connectToDatabase();
    if (!name || !phone) {
        return new Response("Missing fields", { status: 400 });
    }
    const newUser = await UserModel.create({
        name: String(name),
        phone: String(phone),
    });
    if (newUser) {
        redirect("/thankyou")
    }
}