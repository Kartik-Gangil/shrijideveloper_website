export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-lg" />

            <div className="relative z-10">
                <div className="h-20 w-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
            </div>
        </div>
    );
}