'use client'
import Footer from '@/app/properties/component/Footer';
import Navbar from '@/app/properties/component/Navbar';
import { Trash, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface GalleryItem {
    _id?: string; // Added to map MongoDB IDs for deletion
    title: string;
    image: string;
}

const Page = () => {
    // Gallery data state
    const [images, setImages] = useState<GalleryItem[]>([]);

    // Loading states
    const [isFetching, setIsFetching] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Form states
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Fetch initial data on mount
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setIsFetching(true);
                const response = await fetch("/api/dashboard/gallery", {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setImages(Array.isArray(result) ? result : result.data || []);
            } catch (error) {
                console.error("Failed to fetch gallery data:", error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchdata();
    }, []);

    // Handle image selection and preview cleanups
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Handle form submission (Upload)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !imageFile) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", imageFile);

            const response = await fetch("/api/dashboard/gallery", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const newImage: GalleryItem = {
                    _id: result.data?._id || Date.now().toString(), // Use actual DB ID if available
                    title: title,
                    image: result.data?.image || previewUrl,
                };

                setImages((prevImages) => [newImage, ...prevImages]);

                // Reset form fields
                setTitle('');
                setImageFile(null);
                setPreviewUrl('');
                console.log("Upload successful:", result.message);
            } else {
                console.error("Upload failed:", result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle resource deletion
    const handleDelete = async (id: string | undefined, imageUrl: string) => {
        if (!id) return;

        try {
            setDeletingId(id);
            const response = await fetch("/api/dashboard/gallery", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    imageUrl: imageUrl // Fallback parameter for publicId configuration
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Instantly filter out item with smooth state extraction
                setImages((prevImages) => prevImages.filter((img) => img._id !== id));
                console.log("Deleted successfully:", result.message);
            } else {
                console.error("Deletion failed:", result.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error during deletion:", error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 mt-16 p-6 flex flex-col items-center gap-8">

                {/* 1. UPLOAD FORM CARD */}
                <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all duration-300">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        📌 Upload Image to Gallery
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Add your title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Image File Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Choose Image</label>
                            <input
                                title='image'
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer disabled:opacity-50"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Image Preview Window */}
                        {previewUrl && (
                            <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 max-h-48 flex justify-center items-center transition-opacity duration-300">
                                <img src={previewUrl} alt="Preview" className="max-h-48 object-contain" />
                            </div>
                        )}

                        {/* Submit Button with Loading Animation */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-red-600 text-white font-semibold py-2.5 rounded-full hover:bg-red-700 transition-colors shadow-sm mt-2 flex items-center justify-center gap-2 disabled:bg-red-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                "Publish Pin"
                            )}
                        </button>
                    </form>
                </div>

                <hr className="w-full max-w-7xl border-gray-300" />

                {/* 2. DYNAMIC PINTEREST GRID DISPLAY */}
                <div className="w-full max-w-7xl">
                    {isFetching ? (
                        /* Smooth Skeleton Loading State */
                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="break-inside-avoid bg-white rounded-xl p-4 shadow-sm space-y-3 animate-pulse">
                                    <div className="bg-gray-200 h-48 w-full rounded-xl" />
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : images.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 max-w-md mx-auto transition-all duration-300">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 text-xl">
                                📸
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">Your feed is empty</h3>
                            <p className="text-gray-500 text-sm">Upload an image above to see your Pinterest grid come alive!</p>
                        </div>
                    ) : (
                        /* Pinterest Masonry Grid */
                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 transition-all duration-500">
                            {images.map((img, i) => {
                                const isDeleting = img._id === deletingId;
                                return (
                                    <div
                                        key={img._id || i}
                                        className={`break-inside-avoid bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative ${isDeleting ? "opacity-40 scale-95 pointer-events-none" : ""
                                            }`}
                                    >
                                        <Image
                                            width={1000}
                                            height={1000}
                                            quality={75}
                                            src={img.image}
                                            alt={img.title}
                                            className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                                        />

                                        {/* Hover Pinterest Overlay */}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 rounded-xl">
                                            <div className="flex justify-end">
                                                <button
                                                    title='delete'
                                                    disabled={deletingId !== null}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Stop click events passing to layout container
                                                        handleDelete(img._id, img.image);
                                                    }}
                                                    className="bg-red-600 text-white p-2.5 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors shadow-md disabled:bg-gray-400"
                                                >
                                                    {isDeleting ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="text-white font-medium text-sm drop-shadow-md">
                                                {img.title}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer language="en" />
        </>
    );
};

export default Page;