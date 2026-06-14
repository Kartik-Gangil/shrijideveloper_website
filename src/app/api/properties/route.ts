import PropertyModel from "@/model/PropertyModel";
import { connectToDatabase } from "@/utils/mongo";
import { deleteCloudinaryImage, uploadToCloudinary } from "@/utils/UploadFunction";
import { NextResponse } from "next/server";


function getPublicIdFromUrl(url: string) {
    try {
        const afterUpload = url.split("/upload/")[1];

        if (!afterUpload) return null;

        const pathWithoutVersion = afterUpload.replace(
            /^v\d+\//,
            ""
        );

        return pathWithoutVersion.substring(
            0,
            pathWithoutVersion.lastIndexOf(".")
        );
    } catch {
        return null;
    }
}



export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        await connectToDatabase();

        if (!id) {
            // Fetch all properties from the database
            const properties = await PropertyModel.find().sort({ position: 1 });
            return NextResponse.json(
                {
                    success: true,
                    properties,
                },
                { status: 200 }
            );
        }
        const property = await PropertyModel.findById(id);
        return NextResponse.json(
            {
                success: true,
                property,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({
            error: "Failed to fetch properties",
            status: 500,
        });
    }
}





/*
{
  title: 'ds',
  price: '4343',
  area: 'd43',
  locationDescription: 'dsds',
  amenities: {
    roadaccess: true,
    electricity: true,
    watersupply: true,
    reraapproved: true
  },
  images: { mainImage: null, additionalImages: [] }
}
 */

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const area = formData.get("area") as string;
        const locationDescription = formData.get(
            "locationDescription"
        ) as string;

        const address = formData.get("address") as string;

        const amenitiesRaw = formData.get("amenities") as string;

        const amenitiesObject = amenitiesRaw
            ? JSON.parse(amenitiesRaw)
            : {};

        const amenities = Object.entries(
            amenitiesObject
        )
            .filter(([_, value]) => value)
            .map(([key]) => key);

        const images = formData.getAll(
            "images"
        ) as File[];

        const additionalImageUrls =
            await Promise.all(
                images.map((file) =>
                    uploadToCloudinary(file)
                )
            );
        const property = await PropertyModel.create({
            title,
            price: price,
            area: Number(area),
            address,
            description: locationDescription,
            amenities,
            images: [
                ...additionalImageUrls,
            ],
        });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Property created successfully",
                data: property,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "Error creating property:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to create property",
            },
            { status: 500 }
        );
    }
}


export async function PUT(request: Request) {
    try {
        await connectToDatabase();

        const formData = await request.formData();

        const id = formData.get("id") as string;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Property ID is required",
                },
                { status: 400 }
            );
        }

        const property = await PropertyModel.findById(id);

        if (!property) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Property not found",
                },
                { status: 404 }
            );
        }

        const title = formData.get("title") as string;
        const price = formData.get("price") as string;
        const area = formData.get("area") as string;
        const address = formData.get("address") as string;
        const locationDescription =
            formData.get("locationDescription") as string;

        const amenitiesRaw =
            (formData.get("amenities") as string) || "{}";

        const amenitiesObject =
            JSON.parse(amenitiesRaw);

        const amenities = Object.entries(
            amenitiesObject
        )
            .filter(([_, value]) => value)
            .map(([key]) => key);

        // Existing images still kept by user
        const existingImages = JSON.parse(
            (formData.get("existingImages") as string) ||
            "[]"
        ) as string[];

        // Newly uploaded images
        const newImages = (
            formData.getAll("images") as File[]
        ).filter(
            (file) =>
                file instanceof File &&
                file.size > 0
        );

        /**
         * STEP 1:
         * Find removed images
         */
        const removedImages = property.images.filter(
            (url: string) =>
                !existingImages.includes(url)
        );

        /**
         * STEP 2:
         * Delete removed images from Cloudinary
         */
        if (removedImages.length > 0) {
            await Promise.all(
                removedImages.map((url: string) =>
                    deleteCloudinaryImage(url)
                )
            );
        }

        /**
         * STEP 3:
         * Upload new images
         */
        let uploadedImages: string[] = [];

        if (newImages.length > 0) {
            uploadedImages = await Promise.all(
                newImages.map((file) =>
                    uploadToCloudinary(file)
                )
            );
        }

        /**
         * STEP 4:
         * Merge existing + uploaded
         */
        const finalImages = [
            ...existingImages,
            ...uploadedImages,
        ];

        /**
         * STEP 5:
         * Update property
         */
        const updatedProperty =
            await PropertyModel.findByIdAndUpdate(
                id,
                {
                    title,
                    price: Number(price),
                    area: Number(area),
                    address,
                    description:
                        locationDescription,
                    amenities,
                    images: finalImages,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Property updated successfully",
                data: updatedProperty,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Property update error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update property",
            },
            {
                status: 500,
            }
        );
    }
}