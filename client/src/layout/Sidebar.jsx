import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-60 bg-black border-r border-gray-800 p-6">
            <h1 className="text-xl font-bold mb-8">VC Scout</h1>

            <nav className="flex flex-col gap-4 text-gray-400">
                <Link to="/">Companies</Link>
            </nav>
        </div>
    );
}
