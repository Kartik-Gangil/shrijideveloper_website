import mongoose, { Model, Schema } from "mongoose";

export interface Gallery {
    image: string;
    title: string;
}

const GallerySchema = new Schema<Gallery>(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const GalleryModel: Model<Gallery> =
    (mongoose.models.Gallery as Model<Gallery>) ||
    mongoose.model<Gallery>("Gallery", GallerySchema);

export default GalleryModel;
