import { useNavigate } from "react-router-dom";
import { Ghost, Home } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <Ghost size={48} className="text-zinc-500" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-zinc-400 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-lg font-medium transition-colors"
            >
                <Home size={18} />
                Back to Home
            </button>
        </div>
    );
}
