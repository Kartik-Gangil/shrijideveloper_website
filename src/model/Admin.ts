import mongoose, { Model, Schema } from "mongoose";

export interface Admin {
    email: string;
    password: string;
}

const AdminSchema = new Schema<Admin>(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const AdminModel: Model<Admin> =
    (mongoose.models.Admin as Model<Admin>) ||
    mongoose.model<Admin>("Admin", AdminSchema);

export default AdminModel;
