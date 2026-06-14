import cloudinary from "./Cloudinary";

export async function uploadToCloudinary(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<string>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "properties",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result!.secure_url);
                    }
                }
            )
            .end(buffer);
    });
}

export async function deleteCloudinaryImage(
    imageUrl: string
) {
    try {
        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1];
        const publicId = filename.split(".")[0];

        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error(
            "Failed to delete Cloudinary image:",
            error
        );
    }
}