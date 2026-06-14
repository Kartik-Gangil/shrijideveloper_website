import PropertyModel from "@/model/PropertyModel";
import UserModel from "@/model/User";
import { connectToDatabase } from "@/utils/mongo";
import cloudinary from "@/utils/Cloudinary";

function getCloudinaryPublicId(url: string) {
    try {
        const uploadIndex = url.indexOf('/upload/');
        if (uploadIndex === -1) return null;
        let rest = url.substring(uploadIndex + '/upload/'.length);
        // remove version like v123456789/
        rest = rest.replace(/^v\d+\//, '');
        // remove file extension
        const lastDot = rest.lastIndexOf('.');
        if (lastDot !== -1) rest = rest.substring(0, lastDot);
        // decode and return
        return decodeURIComponent(rest);
    } catch (e) {
        return null;
    }
}


export async function GET() {
    try {
        await connectToDatabase();
        const plot = await PropertyModel.find();

        const user = await UserModel.find();

        return new Response(
            JSON.stringify({
                plot,
                PlotCount: plot.length,
                UsersCount: user.length,
                totalValue: plot.reduce(
                    (acc, item) => acc + Number(item.price || 0),
                    0
                ),
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return new Response("Failed to fetch dashboard data", { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        // console.log(id)

        if (!id) {
            return new Response("Property ID is required", { status: 400 });
        }

        const property = await PropertyModel.findById(id);

        if (!property) {
            return new Response("Property not found", { status: 404 });
        }

        // attempt to delete images from Cloudinary
        try {
            const images: string[] = property.images || [];
            await Promise.all(images.map(async (imgUrl) => {
                const publicId = getCloudinaryPublicId(imgUrl);
                if (publicId) {
                    try {
                        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
                    } catch (err) {
                        console.warn('Failed to delete cloudinary image', publicId, err);
                    }
                }
            }));
        } catch (err) {
            console.warn('Error while deleting cloudinary images', err);
        }

        const result = await PropertyModel.findByIdAndDelete(id);

        return new Response(
            JSON.stringify({ message: "Property deleted successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error deleting property:", error);
        return new Response("Failed to delete property", { status: 500 });
    }
} 