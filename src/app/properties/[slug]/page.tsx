// 'use client'
import Image from "next/image";
import Navbar from "../component/Navbar";
import { connectToDatabase } from "@/utils/mongo";
import PropertyModel from "@/model/PropertyModel";
import Footer from "../component/Footer";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { bookVisit } from "@/app/actions/property"
import PropertyCarousel from "../component/PropertyCarousel";

// interface Property {
//     title: string;
//     image: [];
//     address: string;
//     price: string;
//     area: string;
//     location: string;
//     ameinties: string;
// }

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PropertyShowcase({ params }: PageProps) {


    const { slug } = await params;

    await connectToDatabase();
    const property = await PropertyModel.findById(slug).lean();

    if (!property) {
        notFound();
    }

    const handleSubmit = () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-[#F6F5F3] min-h-screen">

            {/* HERO */}

            <section className="relative h-[90vh]">

                <PropertyCarousel images={property.images ?? []} />

                <div className="absolute inset-0 bg-black/20"></div>

                {/* NAVBAR */}

                <Navbar />


                {/* HERO CONTENT */}

                <div className="absolute bottom-20 left-0 right-0">

                    <div className="max-w-7xl mx-auto px-6">

                        <span className="bg-green-700 text-white px-5 py-2 rounded-full">

                            Government Verified & RERA Approved

                        </span>

                        <h1 className="text-white text-6xl font-bold mt-6">{property?.title}</h1>

                        <p className="text-white text-xl mb-5 mt-4 max-w-2xl">{property?.description}</p>

                    </div>

                </div>

            </section>


            {/* MAIN */}

            <section className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">

                <div className="grid lg:grid-cols-[1fr_360px] gap-8">

                    {/* LEFT */}

                    <div className="space-y-8">

                        {/* DETAILS CARD */}

                        <div className="bg-white rounded-3xl p-8 shadow">

                            <div className="grid md:grid-cols-3 gap-6 border-b pb-8">

                                <div>

                                    <p className="text-gray-500">

                                        STARTING PRICE

                                    </p>

                                    <h3 className="text-[#A86300] text-4xl font-bold">{property?.price}</h3>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        PLOT SIZE

                                    </p>

                                    <h3 className="text-4xl font-bold">{property?.area} Sq.Ft</h3>

                                </div>

                                <div>

                                    <p className="text-gray-500">

                                        LOCATION

                                    </p>

                                    <h3 className="text-4xl font-bold">{property?.address}</h3>

                                </div>

                            </div>

                            <h2 className="text-4xl font-bold mt-10">

                                About The Project

                            </h2>

                            <p className="mt-5 text-gray-600 leading-8">{property?.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

                                {property?.amenities?.map((item , i) => (

                                    <div
                                        key={i}
                                        className="bg-[#F5F5F5] rounded-2xl p-6 text-center"
                                    >

                                        {item.toUpperCase()}

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* EMI TABLE */}

                        {/* <div className="bg-white rounded-3xl p-8 shadow">

                            <h2 className="text-4xl font-bold mb-8">

                                Affordable EMI Plans

                            </h2>

                            <div className="overflow-auto">

                                <table className="w-full">

                                    <thead>

                                        <tr className="text-left bg-gray-100">

                                            <th className="p-4">Down Payment</th>

                                            <th>Tenure</th>

                                            <th>Monthly EMI</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {[
                                            ["50,000", "12 Months", "38,500"],
                                            ["1,00,000", "24 Months", "18,200"],
                                            ["1,50,000", "36 Months", "11,400"]
                                        ].map((row, index) => (

                                            <tr
                                                key={index}
                                                className="border-b"
                                            >

                                                <td className="p-5">

                                                    ₹{row[0]}

                                                </td>

                                                <td>{row[1]}</td>

                                                <td className="text-green-700 font-bold">

                                                    ₹{row[2]}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div> */}


                        {/* CONNECTIVITY */}

                        <div className="grid lg:grid-cols-1 gap-8">

                            {/* <div>

                                <h2 className="text-5xl font-bold mb-8">

                                    Connectivity & Location

                                </h2>

                                <div className="space-y-5">

                                    {[
                                        "Strategic Location",
                                        "Nearby Schools",
                                        "Healthcare"
                                    ].map((item) => (

                                        <div
                                            key={item}
                                            className="bg-white rounded-2xl p-6 shadow"
                                        >

                                            {item}

                                        </div>

                                    ))}

                                </div>

                            </div> */}

                            <div className="bg-white rounded-3xl overflow-hidden shadow">

                                <Image
                                    src="/map.png"
                                    className="w-full h-full object-cover"
                                    alt="area map"
                                    height={10000}
                                    width={10000}
                                />

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDEBAR */}

                    <div className="space-y-6">

                        <div className="bg-white rounded-3xl p-8 shadow sticky top-10">

                            <h2 className="text-4xl font-bold">

                                Book a Visit

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Leave your details and our expert will guide you.

                            </p>

                            <form className="space-y-5 mt-8" action={bookVisit}>

                                <input
                                    name="name"
                                    placeholder="Your Name"
                                    className="w-full border rounded-xl p-4"
                                />

                                <input
                                    name="phone"
                                    placeholder="+91 00000 00000"
                                    className="w-full border rounded-xl p-4"
                                />

                                <button type="submit"
                                    className="w-full bg-[#A86300] py-5 rounded-xl text-white hover:cursor-pointer">

                                    Request Callback

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <Footer language="en" />


            {/* WHATSAPP */}

            <button
                title="whatsapp"
                className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center"
            >

                <MessageCircle />

            </button>

        </div>
    )
}