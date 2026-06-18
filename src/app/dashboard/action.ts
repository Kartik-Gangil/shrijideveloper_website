'use server';

import { connectToDatabase } from '@/utils/mongo';
import UserModel from '@/model/User';

// Yeh function server par chalega aur seedhe data return karega
export async function fetchLeads() {
    await connectToDatabase();
    const user = await UserModel.find();
    if (!user) return null;
    // Plain object return karo kyuki complex Mongoose objects serializable nahi hote
    return user.map((u, i) => (
        {
            name: String(u.name).toLowerCase() === 'null' ? '' : u.name?.toString() || '',
            phone: u.phone?.toString() || '',
        }
    ));
}