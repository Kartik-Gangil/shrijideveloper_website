'use client'
import { useEffect, useState } from "react"
import Navbar from "./component/Navbar"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface properties {
    id: string;
    title: string;
    amenities: [];
    address: string;
    area: number;
    description: string;
    images: [];
    listedAt: string;
    price: number;
    status: string;
}

export default function PropertyListingPage() {
    const [properties, setProperties] = useState<properties[]>([])
    const router = useRouter();
    const fetchData = async () => {
        try {
            const res = await fetch("/api/properties", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            const formattedData: properties[] = data.properties.map((item: any) => ({
                id: item._id?.toString() || "",
                title: item.title || "",
                amenities: item.amenities || [],
                address: item.address || "",
                area: item.area || 0,
                description: item.description || "",
                images: item.images || [],
                listedAt: item.listedAt || item.createdAt || "",
                price: item.price || 0,
                status: item.status || "",
            }))
            setProperties(formattedData)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()

    }, [])



    return (
        <div className="bg-[#F7F4F1] min-h-screen">
            <Navbar />
            <section className="pt-10 relative">

                {/* HERO */}

                <div className="max-w-7xl mx-auto px-6 py-20">

                    <span className="text-[#A86300] font-semibold">
                        Premium Land Investments
                    </span>

                    <h1 className="text-6xl font-bold mt-4 leading-tight">
                        Discover Verified
                        <br />
                        Land Projects in India
                    </h1>

                    <p className="text-gray-600 text-lg mt-5 max-w-xl">
                        Browse government-approved plots with transparent pricing,
                        legal verification and premium locations.
                    </p>

                </div>

                <div className="bg-white rounded-3xl lg:mx-35 mx-3 shadow-xl p-3 mt-10 flex flex-wrap gap-3">

                    <input
                        placeholder="Search city or project"
                        className="flex-1 p-4 outline-none hover:cursor-pointer"
                    />

                    <select className="p-4 hover:cursor-pointer">
                        <option>Budget</option>
                    </select>

                    <select className="p-4 hover:cursor-pointer">
                        <option>Property Type</option>
                    </select>

                    <button className="bg-[#A86300] hover:cursor-pointer text-white px-8 rounded-2xl">
                        Search
                    </button>

                </div>
                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid lg:grid-cols-[280px_1fr] gap-10">

                        {/* FILTERS */}

                        <div className="bg-white rounded-3xl p-8 h-fit shadow-sm">

                            <h2 className="font-bold text-2xl mb-8">

                                Filters

                            </h2>

                            <div className="space-y-6">

                                <select className="w-full border rounded-xl p-4 hover:cursor-pointer">

                                    <option>Location</option>

                                </select>

                                <select className="w-full border rounded-xl p-4 hover:cursor-pointer">

                                    <option>Price Range</option>

                                </select>

                                <select className="w-full border rounded-xl p-4 hover:cursor-pointer">

                                    <option>Plot Size</option>

                                </select>

                                <button className="w-full hover:cursor-pointer bg-[#A86300] text-white rounded-xl py-4">

                                    Apply Filters

                                </button>

                            </div>

                        </div>


                        {/* LISTINGS */}

                        <div>

                            <div className="flex justify-between items-center mb-8">

                                <h2 className="text-3xl font-bold">

                                    {properties.length} Properties Found

                                </h2>

                                <select className="border rounded-xl px-5 py-3 hover:cursor-pointer">

                                    <option>Newest</option>

                                    <option>Price Low → High</option>

                                    <option>Price High → Low</option>

                                </select>

                            </div>


                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                                {properties.map((property) => (

                                    <div
                                        key={property.id}
                                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
                                    >

                                        <div className="relative">

                                            <Image
                                                src={property.images[0]}
                                                className="h-64 w-full object-cover"
                                                width={100}
                                                height={100}
                                                alt="plot image"
                                            />

                                            <span className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm">

                                                Verified

                                            </span>



                                        </div>


                                        <div className="p-6">

                                            <h3 className="font-bold text-2xl">

                                                {property.title}

                                            </h3>

                                            <p className="text-gray-500 mt-2">

                                                📍 {property.address}

                                            </p>


                                            <div className="flex justify-between mt-6">

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Price

                                                    </p>

                                                    <p className="font-bold text-[#A86300]">

                                                        {property.price}

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Size

                                                    </p>

                                                    <p className="font-bold">

                                                        {property.area}

                                                    </p>

                                                </div>

                                            </div>


                                            <button className="mt-6 w-full bg-[#A86300] hover:cursor-pointer text-white py-4 rounded-xl"
                                                onClick={() => router.push(`properties/${property.id}`)}>

                                                View Details

                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </div>

    )

}