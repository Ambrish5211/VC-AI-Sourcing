import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Building2, Bookmark, List, Home } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            )}
        >
            <Icon size={18} />
            {label}
        </Link>
    );
};

export default function Sidebar() {
    return (
        <div className="w-64 bg-black border-r border-zinc-800 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-8">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <Building2 className="text-black" size={20} />
                    </div>
                    VC Scout
                </div>

                <nav className="space-y-1">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
                        Menu
                    </div>
                    <NavItem to="/" icon={Home} label="Home" />
                    <NavItem to="/companies" icon={LayoutGrid} label="Companies" />

                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-8 mb-2 px-3">
                        Library
                    </div>
                    <NavItem to="/lists" icon={List} label="My Lists" />
                    <NavItem to="/saved" icon={Bookmark} label="Saved" />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
                    <div className="text-sm">
                        <div className="font-medium text-white">Guest User</div>
                        <div className="text-xs text-zinc-400">Free Plan</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
