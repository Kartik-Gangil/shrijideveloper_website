'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <CheckCircle
                    size={80}
                    className="mx-auto text-green-500 mb-6"
                />

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Thank You!
                </h1>

                <p className="text-gray-600 mb-8">
                    We have received your request successfully. Our team will
                    review the details and get back to you shortly.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/properties"
                        className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                    >
                        Browse Properties
                    </Link>
                </div>
            </div>
        </div>
    );
}