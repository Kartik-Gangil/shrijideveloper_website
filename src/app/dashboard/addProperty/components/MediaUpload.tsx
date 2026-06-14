'use client';

import React from 'react';
import { PropertyForm } from '../type';

type Images = PropertyForm['images'];

interface Props {
  image: Images;
  setImage: React.Dispatch<
    React.SetStateAction<PropertyForm>
  >;
}

const MediaUpload = ({
  image,
  setImage,
}: Props) => {
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      e.target.files ?? []
    );

    if (!files.length) return;
    console.log("Current state:", image);
    setImage((prev) => {
      console.log("prev =", prev);
      console.log("prev.images =", prev.images);

      return {
        ...prev,
        images: [
          ...(Array.isArray(prev.images)
            ? prev.images
            : []),
          ...files,
        ],
      };
    });

    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImage((prev) => ({
      ...prev,
      images: (prev.images || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <h2 className="text-[#A86300] text-3xl font-bold mb-8">
        Property Media
      </h2>

      <label
        htmlFor="propertyImages"
        className="border-2 border-dashed border-[#D6B79A] rounded-2xl h-[220px] flex flex-col justify-center items-center cursor-pointer"
      >
        <div className="text-5xl">📷</div>

        <h3 className="font-bold mt-4">
          UPLOAD PROPERTY IMAGES
        </h3>

        <p className="text-gray-500">
          JPEG, PNG up to 10MB
        </p>

        <input
          id="propertyImages"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />
      </label>

      {(image?.length ?? 0) > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {image?.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Property ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Cover
                </span>
              )}

              <button
                type="button"
                aria-label={`Remove image ${index + 1
                  }`}
                onClick={() =>
                  removeImage(index)
                }
                className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;