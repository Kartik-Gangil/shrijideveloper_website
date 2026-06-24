'use client';

import React, { useState } from 'react';

interface DownloadButtonProps {
    imageUrl: string;
    imageTitle: string;
}

export default function DownloadButton({ imageUrl, imageTitle }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the click from triggering any parent card click events
        e.stopPropagation();
        e.preventDefault();

        if (isDownloading) return;
        setIsDownloading(true);

        try {
            // 1. Fetch the image data as a binary blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // 2. Create a local temporary URL pointing to the binary object
            const blobUrl = window.URL.createObjectURL(blob);

            // 3. Force a virtual anchor link click to download the asset cleanly
            const link = document.createElement('a');
            link.href = blobUrl;

            // Clean up the file name (replace spaces with hyphens)
            const fileName = `${imageTitle.toLowerCase().replace(/\s+/g, '-') || 'download'}.jpg`;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            // 4. Clean up memory allocations
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Failed to download image:', error);
            // Fallback: Try opening in a new tab if CORS blocks the fetch request
            window.open(imageUrl, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors z-10 shadow"
        >
            {isDownloading ? 'Saving...' : 'Save'}
        </button>
    );
}