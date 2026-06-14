import { CheckCircle, XCircle } from "lucide-react";

interface SubmissionStatusProps {
    isOpen: boolean;
    type: "success" | "error";
    title?: string;
    message: string;
    onClose: () => void;
}

export default function SubmissionStatus({
    isOpen,
    type,
    title,
    message,
    onClose,
}: SubmissionStatusProps) {
    if (!isOpen) return null;

    const success = type === "success";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#F8F6F1] rounded-[28px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Top Accent */}
                <div
                    className={`h-2 ${success ? "bg-green-700" : "bg-red-500"
                        }`}
                />

                <div className="p-8 text-center">

                    {/* Icon */}
                    <div
                        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${success
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                    >
                        {success ? (
                            <CheckCircle
                                size={42}
                                className="text-green-700"
                            />
                        ) : (
                            <XCircle
                                size={42}
                                className="text-red-500"
                            />
                        )}
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                        {title ||
                            (success
                                ? "Request Submitted"
                                : "Submission Failed")}
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {message}
                    </p>

                    {/* Button */}
                    <button
                        onClick={onClose}
                        className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${success
                                ? "bg-green-700 hover:bg-green-800 text-white"
                                : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                    >
                        {success ? "Continue Browsing" : "Try Again"}
                    </button>
                </div>
            </div>
        </div>
    );
}