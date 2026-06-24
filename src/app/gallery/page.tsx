import { connectToDatabase } from "@/utils/mongo";
import Footer from "../properties/component/Footer";
import Navbar from "../properties/component/Navbar";
import GalleryModel from "@/model/Gallery";
import DownloadButton from "./component/DownloadBTN";

interface IMAGE {
    title: string;
    image: string
}

// Mock data for the Pinterest feed (Try changing this to an empty array [] to see the empty state)
let images: IMAGE[] = [];

const Page = async () => {

    try {
        await connectToDatabase();
        const data = await GalleryModel.find().sort({ position: 1 }).lean();
        images = JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }

    // 1. Check if the array is empty or doesn't exist
    if (!images || images.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5 text-center">
                    <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        {/* Placeholder for an empty state icon */}
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                            🖼️
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No images found
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            It looks like there’s nothing here yet. Try uploading some photos or check back later!
                        </p>
                        {/* <button className="bg-red-600 text-white font-medium px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors shadow-sm">
                            Explore                        </button> */}
                    </div>
                </div>
                <Footer language="en" />
            </>
        );
    }

    // 2. Render the Pinterest gimages exist
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 mt-20 p-6">
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mx-auto max-w-7xl">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="break-inwhite rounded-xl overflow-shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group relative"
                        >
                            <img
                                src={img.image}
                                alt={img.title}
                                className="w-full object-cover rounded-xl"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 rounded-xl">
                                <div className="flex justify-end">
                                    <DownloadButton imageUrl={img.image} imageTitle={img.title} />
                                </div>
                                <div className="text-white font-medium text-sm drop-shadow-md">
                                    {img.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer language="en" />
        </>
    );
};

export default Page;