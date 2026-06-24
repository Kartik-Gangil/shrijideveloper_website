import GalleryModel from "@/model/Gallery";
import { connectToDatabase } from "@/utils/mongo"
import { deleteCloudinaryImage, uploadToCloudinary } from "@/utils/UploadFunction";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const formData = await request.formData();
        console.log(formData)
        const title = formData.get("title") as string;
        const image = formData.get("image") as File;
        const additionalImageUrls = await uploadToCloudinary(image)

        const data = await GalleryModel.create({
            title,
            image: additionalImageUrls
        })
        return NextResponse.json(
            {
                success: true,
                message:
                    "Image Upload successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed to upload image" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectToDatabase();
        const url = new URL(request.url);
        const queryPublicId = url.searchParams.get("publicId");
        const body = await request.json().catch(() => ({} as Record<string, any>));
        const publicId = queryPublicId || body.publicId || body.imageUrl;

        if (!publicId) {
            return NextResponse.json(
                { success: false, message: "publicId or imageUrl is required to delete the image" },
                { status: 400 }
            );
        }

        await deleteCloudinaryImage(publicId);

        if (body.id) {
            await GalleryModel.findByIdAndDelete(body.id);
        }

        return NextResponse.json(
            { success: true, message: "Image deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to delete image" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const data = await GalleryModel.find().sort({ position: 1 }).lean();
        return NextResponse.json({
            data
        },
            { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "Failed to delete image" },
            { status: 500 }
        );
    }
}
