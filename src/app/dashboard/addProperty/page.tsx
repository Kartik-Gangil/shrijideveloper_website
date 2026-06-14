'use client'
import { useState } from "react"
import PropertyDetails from "./components/PropertyDetails";
import AmenitiesSection from "./components/AmenitiesSection";
import ActionButton from "./components/ActionButton";
import MapPreview from "./components/MapPreview";
import MediaUpload from "./components/MediaUpload";
import Navbar from "@/app/properties/component/Navbar";
import { PropertyForm } from "./type";
import Loader from "@/components/loader";


export default function AddPropertyPage() {
  const [propertyData, setPropertyData] = useState<PropertyForm>({
    title: "",
    price: "",
    area: "",
    locationDescription: "",
    address: "",
    amenities: {
      roadaccess: false,
      electricity: false,
      watersupply: false,
      reraapproved: false,
    },
    existingImages: [],
    images: [],
  });

  const [status, setStatus] = useState({
    open: false,
    type: "success" as "success" | "error",
    message: "",
  });
  const [loading, setloading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setloading(true);
      // propertyData.images.mainImage === null
      if (propertyData.title === '' || propertyData.area === '' ||
        propertyData.price === '' || propertyData.locationDescription === ''
      ) {
        alert("Field are not accepted as empty")
        return;
      };

      const formData = new FormData();

      formData.append("title", propertyData.title);
      formData.append("price", propertyData.price);
      formData.append("area", propertyData.area);
      formData.append("address", propertyData.address);
      formData.append(
        "locationDescription",
        propertyData.locationDescription
      );

      formData.append(
        "amenities",
        JSON.stringify(propertyData.amenities)
      );

      // if (propertyData.images.mainImage) {
      //   formData.append(
      //     "mainImage",
      //     propertyData.images.mainImage
      //   );
      // }

      propertyData.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch('/api/properties', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert('Failed to create property: ' + (err?.error || res.statusText));
        setloading(false)
        return;
      }

      const data = await res.json();
      setloading(false)
      alert('Property created successfully');
      // console.log('created property', data);
    } catch (error) {
      setloading(false)
      console.error(error);
      alert('An error occurred while submitting the property');
    }
  }


  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <section className="bg-[#F7F4F1] min-h-screen py-12 my-8 px-5">
        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="mb-12">

            <h1 className="text-5xl font-bold text-[#111]">

              Add New Plot Listing

            </h1>

            <p className="mt-3 text-gray-600">

              Enter the details of your property to list it on our

              government-verified platform.

            </p>

          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

            {/* LEFT COLUMN */}

            <div className="space-y-8">

              {/* Property Details */}
              <PropertyDetails propertyData={propertyData} setPropertyData={setPropertyData} />


              {/* Amenities */}
              <AmenitiesSection amenities={propertyData.amenities} updateAmenities={setPropertyData} />

              <div>
                <div className="mt-8 bg-[#EAF7E5] border border-[#B9D7A9] rounded-xl p-5 flex gap-3">

                  <div>✅</div>

                  <p className="text-green-800">

                    Your listing will be marked as
                    <b> RERA Approved </b>
                    once verified.

                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT COLUMN */}

            <div className="space-y-6">
              <MediaUpload image={propertyData.images} setImage={setPropertyData} />
              {/* Buttons */}
              <ActionButton onSubmit={handleSubmit} />
              {/* Map */}
              <MapPreview />

            </div>

          </div>

        </div>
      </section>
    </>
  )
}