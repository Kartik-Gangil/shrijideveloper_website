import mongoose, { Model, Schema } from "mongoose";
export interface User {
    name: String;
    phone: String;
}

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel: Model<User> =
    (mongoose.models.User as Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;