import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PropertyDocument extends Document {
  title: string;
  description?: string;
  price: string;
  propertyType?: string;
  status: 'available' | 'sold' | 'pending';
  area?: number;
  address?: string;
  images?: string[];
  amenities?: string[];
  listedAt?: Date;
}

const PropertySchema = new Schema<PropertyDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available',
    },
    area: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    listedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyModel =
  (mongoose.models.Property as Model<PropertyDocument>) ||
  mongoose.model<PropertyDocument>(
    "Property",
    PropertySchema
  );

export default PropertyModel;
