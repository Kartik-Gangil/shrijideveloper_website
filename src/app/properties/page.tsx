// app/properties/page.tsx
import { connectToDatabase } from '@/utils/mongo';
import PropertyModel from '@/model/PropertyModel';
import PropertyListingClient from './PropertyListingClient/page';

export interface Property {
    id: string;
    title: string;
    amenities: string[];
    address: string;
    area: number;
    description: string;
    images: string[];
    listedAt: string;
    price: number;
    status: string;
}

// Forces Next.js to dynamically fetch data on every request (SSR)
export const dynamic = 'force-dynamic';

export default async function PropertyListingPage() {
    let formattedData: Property[] = [];

    try {
        await connectToDatabase();
        // Fetch properties ordered by position
        const data = await PropertyModel.find().sort({ position: 1 }).lean();

        formattedData = data.map((item: any) => ({
            id: item._id?.toString() || '',
            title: item.title || '',
            amenities: item.amenities || [],
            address: item.address || '',
            area: item.area || 0,
            description: item.description || '',
            images: item.images || [],
            listedAt: item.listedAt?.toString() || item.createdAt?.toString() || '',
            price: item.price || 0,
            status: item.status || '',
        }));
    } catch (error) {
        console.error("Database fetch failed:", error);
    }

    // Pass the pre-fetched properties straight into your client component
    return <PropertyListingClient initialProperties={formattedData} />;
}