import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Building2, Bookmark, List, Home, LineChart, X } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
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

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Content */}
            <div className={clsx(
                "w-64 bg-black border-r border-zinc-800 flex flex-col h-screen overflow-y-auto transition-transform duration-300 ease-in-out z-50",
                "fixed inset-y-0 left-0 md:relative md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity" onClick={onClose}>
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <Building2 className="text-black" size={20} />
                            </div>
                            VC Scout
                        </Link>

                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="space-y-1">
                        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-3">
                            Menu
                        </div>
                        <NavItem to="/" icon={Home} label="Home" onClick={onClose} />
                        <NavItem to="/companies" icon={LayoutGrid} label="Companies" onClick={onClose} />
                        <NavItem to="/analytics" icon={LineChart} label="Analytics" onClick={onClose} />

                        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-8 mb-2 px-3">
                            Library
                        </div>
                        <NavItem to="/lists" icon={List} label="My Lists" onClick={onClose} />
                        <NavItem to="/saved" icon={Bookmark} label="Saved" onClick={onClose} />
                    </nav>
                </div>


            </div>
        </>
    );
};

export default Sidebar;
