import React from 'react'
import { PropertyForm } from '../type';

interface Props {
    propertyData: PropertyForm;
    setPropertyData: React.Dispatch<
        React.SetStateAction<PropertyForm>
    >;
}
const PropertyDetails = ({ propertyData, setPropertyData }: Props) => {

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

        setPropertyData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <>
            <div className="bg-white rounded-3xl shadow-sm p-8">

                <h2 className="text-[#A86300] text-3xl font-bold mb-8">

                    Property Details

                </h2>

                <div className="space-y-6">

                    <div>

                        <label className="font-medium">

                            Property Title

                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g., Modern Greens Phase II"
                            className="w-full mt-3 border border-[#D6B79A] rounded-xl px-5 py-4 outline-none"
                            value={propertyData.title}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            name="price"
                            type="text"
                            placeholder="Price ₹ 0.00"
                            className="border border-[#D6B79A] rounded-xl px-5 py-4"
                            value={propertyData.price}
                            onChange={handleChange}
                        />

                        <input
                            name="area"
                            type="text"
                            placeholder="enter the area of the Plot. e.g., 1200"
                            className="border border-[#D6B79A] rounded-xl px-5 py-4"
                            value={propertyData.area}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label>

                            Location Description

                        </label>

                        <textarea
                            name="locationDescription"
                            rows={4}
                            placeholder="Describe proximity to landmarks..."
                            className="w-full mt-3 border border-[#D6B79A] rounded-xl p-5 resize-none"
                            value={propertyData.locationDescription}
                            onChange={handleChange}
                        />

                    </div>
                    <div>

                        <label>

                            Address

                        </label>

                        <input
                            name="address"
                            placeholder="Address"
                            className="w-full mt-3 border border-[#D6B79A] rounded-xl p-5 resize-none"
                            value={propertyData.address}
                            onChange={handleChange}
                        />

                    </div>





                </div>

            </div>
        </>
    )
}

export default PropertyDetails
