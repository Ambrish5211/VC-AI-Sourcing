import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutGrid, Building2, Bookmark, List, Search } from 'lucide-react';
import clsx from 'clsx';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            )
        }
    >
        <Icon size={18} />
        {label}
    </NavLink>
);

const Layout = () => {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Building2 className="text-black" size={20} />
                        </div>
                        VC Scout
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Discover
                    </div>
                    <SidebarItem to="/companies" icon={Search} label="Companies" />

                    <div className="mt-8 px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Library
                    </div>
                    <SidebarItem to="/lists" icon={List} label="My Lists" />
                    <SidebarItem to="/saved" icon={Bookmark} label="Saved Searches" />
                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
