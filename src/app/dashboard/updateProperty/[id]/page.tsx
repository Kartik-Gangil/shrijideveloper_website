'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import PropertyDetails from '@/app/dashboard/addProperty/components/PropertyDetails';
import AmenitiesSection from '@/app/dashboard/addProperty/components/AmenitiesSection';
import ActionButton from '@/app/dashboard/addProperty/components/ActionButton';
import MapPreview from '@/app/dashboard/addProperty/components/MapPreview';
import MediaUpload from '@/app/dashboard/addProperty/components/MediaUpload';
import Navbar from '@/app/properties/component/Navbar';
import { PropertyForm } from '@/app/dashboard/addProperty/type';
import Image from 'next/image';
import Loader from '@/components/loader';

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [propertyData, setPropertyData] = useState<PropertyForm>({
    title: '',
    price: '',
    area: '',
    locationDescription: '',
    address: '',
    amenities: {
      roadaccess: false,
      electricity: false,
      watersupply: false,
      reraapproved: false,
    },
    existingImages: [],
    images: [],
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties?id=${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch property');
        }

        const property = await res.json();
        const Property = property.property
        setPropertyData({
          title: Property.title || '',
          price: String(Property.price || ''),
          area: String(Property.area || ''),
          address: Property.address || '',
          locationDescription:
            Property.description || '',

          amenities: {
            roadaccess:
              Property.amenities?.includes('roadaccess') ??
              false,

            electricity:
              Property.amenities?.includes('electricity') ??
              false,

            watersupply:
              Property.amenities?.includes('watersupply') ??
              false,

            reraapproved:
              Property.amenities?.includes('reraapproved') ??
              false,
          },
          images: [],
          existingImages: Property.images,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("id", id);

      formData.append(
        "title",
        propertyData.title
      );

      formData.append(
        "price",
        propertyData.price
      );

      formData.append(
        "area",
        propertyData.area
      );

      formData.append(
        "address",
        propertyData.address
      );

      formData.append(
        "locationDescription",
        propertyData.locationDescription
      );

      formData.append(
        "amenities",
        JSON.stringify(
          propertyData.amenities
        )
      );

      // IMPORTANT
      formData.append(
        "existingImages",
        JSON.stringify(
          propertyData.existingImages
        )
      );

      // IMPORTANT
      propertyData.images.forEach(
        (file) => {
          formData.append(
            "images",
            file
          );
        }
      );

      const res = await fetch(
        "/api/properties",
        {
          method: "PUT",
          body: formData,
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      alert(
        "Property updated successfully"
      );

      router.push(
        "/dashboard/properties"
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update property"
      );
    }
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Navbar />

      <section className="bg-[#F7F4F1] min-h-screen py-12 my-8 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-[#111]">
              Edit Property
            </h1>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="space-y-8">
              <PropertyDetails
                propertyData={propertyData}
                setPropertyData={setPropertyData}
              />

              <AmenitiesSection
                amenities={propertyData.amenities}
                updateAmenities={setPropertyData}
              />
            </div>

            <div className="space-y-6">
              <MediaUpload
                image={propertyData.images}
                setImage={setPropertyData}
              />

              <div className='flex gap-2 '>
                {propertyData?.existingImages?.map((image, i) => (
                  <Image key={i} className="rounded-2xl" src={image} width={100} height={100} alt="existing image" />
                ))}
              </div>

              <ActionButton
                onSubmit={handleUpdate}
              />

              <MapPreview />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}