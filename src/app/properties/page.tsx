'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from './component/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    const [properties, setProperties] = useState<properties[]>([]);
    const router = useRouter();

    const [titleQuery, setTitleQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [sizeFilter, setSizeFilter] = useState('any');
    const [priceFilter, setPriceFilter] = useState('any');
    const [showFilters, setShowFilters] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/properties');
            const data = await res.json();

            const formattedData: properties[] = data.properties.map((item: any) => ({
                id: item._id?.toString() || '',
                title: item.title || '',
                amenities: item.amenities || [],
                address: item.address || '',
                area: item.area || 0,
                description: item.description || '',
                images: item.images || [],
                listedAt: item.listedAt || item.createdAt || '',
                price: item.price || 0,
                status: item.status || '',
            }));

            setProperties(formattedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setShowFilters(window.innerWidth >= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            if (
                titleQuery &&
                !property.title.toLowerCase().includes(titleQuery.toLowerCase())
            )
                return false;

            if (
                locationQuery &&
                !property.address.toLowerCase().includes(locationQuery.toLowerCase())
            )
                return false;

            const area = property.area || 0;
            if (sizeFilter === 'lt500' && !(area < 500)) return false;
            if (sizeFilter === '500-1000' && !(area >= 500 && area <= 1000))
                return false;
            if (sizeFilter === 'gt1000' && !(area > 1000)) return false;

            const price = property.price || 0;
            if (priceFilter === 'lt1000000' && !(price < 1000000)) return false;
            if (
                priceFilter === '1000000-5000000' &&
                !(price >= 1000000 && price <= 5000000)
            )
                return false;
            if (priceFilter === 'gt5000000' && !(price > 5000000)) return false;

            return true;
        });
    }, [properties, titleQuery, locationQuery, sizeFilter, priceFilter]);

    return (
        <div className="bg-[#F7F4F1] min-h-screen">
            <Navbar />

            {/* HERO */}
            <section className="pt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
                    <span className="text-[#A86300] font-semibold text-sm sm:text-base">
                        Premium Land Investments
                    </span>

                    <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Discover Verified
                        <br />
                        Land Projects in India
                    </h1>

                    <p className="text-gray-600 mt-5 max-w-xl text-sm sm:text-base">
                        Browse government-approved plots with transparent pricing, legal
                        verification and premium locations.
                    </p>
                </div>

                {/* FILTER TOGGLE (mobile) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:hidden mb-4">
                    <button
                        onClick={() => setShowFilters((s) => !s)}
                        className="w-full py-2 bg-white rounded-xl shadow text-sm font-medium"
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {/* FILTERS */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div
                        className={`${showFilters ? 'block' : 'hidden'
                            } md:grid md:grid-cols-5 gap-3 bg-white rounded-2xl shadow-lg p-4`}
                    >
                        <input
                            placeholder="Search title"
                            className="w-full p-3 rounded-xl border outline-none text-sm"
                            value={titleQuery}
                            onChange={(e) => setTitleQuery(e.target.value)}
                        />

                        <input
                            placeholder="Location"
                            className="w-full p-3 rounded-xl border outline-none text-sm"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                        />

                        <select
                            className="w-full p-3 rounded-xl border text-sm"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                        >
                            <option value="any">Price Range</option>
                            <option value="lt1000000">Less than 1M</option>
                            <option value="1000000-5000000">1M - 5M</option>
                            <option value="gt5000000">Above 5M</option>
                        </select>

                        <select
                            className="w-full p-3 rounded-xl border text-sm"
                            value={sizeFilter}
                            onChange={(e) => setSizeFilter(e.target.value)}
                        >
                            <option value="any">Plot Size</option>
                            <option value="lt500">&lt; 500</option>
                            <option value="500-1000">500 - 1000</option>
                            <option value="gt1000">&gt; 1000</option>
                        </select>

                        <button
                            className="w-full bg-[#A86300] text-white rounded-xl text-sm font-medium hover:opacity-90 transition"
                            onClick={() => {
                                setTitleQuery('');
                                setLocationQuery('');
                                setSizeFilter('any');
                                setPriceFilter('any');
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* LISTINGS */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl sm:text-3xl font-bold">
                            {filteredProperties.length} Properties Found
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <div
                                key={property.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
                            >
                                <div className="relative h-56 sm:h-64 w-full">
                                    <Image
                                        src={property.images?.[0] || '/placeholder.jpg'}
                                        alt="plot image"
                                        fill
                                        className="object-cover"
                                    />

                                    <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                                        Verified
                                    </span>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <h3 className="font-bold text-lg sm:text-xl">
                                        {property.title}
                                    </h3>

                                    <p className="text-gray-500 mt-2 text-sm">
                                        📍 {property.address}
                                    </p>

                                    <div className="flex justify-between mt-5 text-sm sm:text-base">
                                        <div>
                                            <p className="text-gray-500">Price</p>
                                            <p className="font-bold text-[#A86300]">
                                                ₹{property.price}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">Size</p>
                                            <p className="font-bold">{property.area} sqft</p>
                                        </div>
                                    </div>

                                    <button
                                        className="mt-5 w-full bg-[#A86300] text-white py-3 rounded-xl hover:opacity-90 transition text-sm sm:text-base"
                                        onClick={() =>
                                            router.push(`properties/${property.id}`)
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}