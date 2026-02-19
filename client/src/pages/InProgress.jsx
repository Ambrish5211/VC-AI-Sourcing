import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";

export default function InProgress() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                <Construction size={48} className="text-blue-500" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Work in Progress</h1>
            <p className="text-zinc-400 mb-8 max-w-md">
                We're still building this feature. Check back soon for updates!
            </p>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-lg font-medium transition-colors"
            >
                <ArrowLeft size={18} />
                Go Back
            </button>
        </div>
    );
}
