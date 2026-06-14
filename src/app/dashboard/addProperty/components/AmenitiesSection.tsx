import React from "react";
import { PropertyForm } from "../type";

type Amenities = PropertyForm["amenities"];

interface Props {
    amenities: Amenities;
    updateAmenities: React.Dispatch<
        React.SetStateAction<PropertyForm>
    >;
}

const amenitiesList: {
    label: string;
    key: keyof Amenities;
}[] = [
        {
            label: "Road Access",
            key: "roadaccess",
        },
        {
            label: "Electricity",
            key: "electricity",
        },
        {
            label: "Water Supply",
            key: "watersupply",
        },
        {
            label: "RERA Approved",
            key: "reraapproved",
        },
    ];

const AmenitiesSection = ({
    amenities,
    updateAmenities,
}: Props) => {
    const handleToggle = (
        key: keyof Amenities
    ) => {
        updateAmenities((prev) => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [key]: !prev.amenities[key],
            },
        }));
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="text-[#A86300] text-3xl font-bold mb-8">
                Amenities & Legal
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {amenitiesList.map((item) => (
                    <label
                        key={item.key}
                        className="border rounded-xl p-5 flex items-center gap-3 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={amenities[item.key]}
                            onChange={() =>
                                handleToggle(item.key)
                            }
                        />

                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesSection;