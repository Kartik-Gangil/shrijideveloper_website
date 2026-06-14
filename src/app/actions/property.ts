'use server';

import UserModel from "@/model/User";
import { connectToDatabase } from "@/utils/mongo";
import { redirect } from 'next/navigation';

export async function bookVisit(formData: FormData) {
    const name = formData.get('name');
    const phone = formData.get('phone');

    console.log(name, phone);

    await connectToDatabase();
    const newUser = await UserModel.create({
        name,
        phone,
    });
    if (newUser) {
        redirect("/thankyou")
    }
}