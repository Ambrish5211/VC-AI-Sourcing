import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, Filter, MapPin, TrendingUp, LayoutGrid, List as ListIcon, Save } from "lucide-react";
import clsx from "clsx";
import { getStageColor } from "../utils/styles";

export default function Companies() {
    const navigate = useNavigate();
    const location = useLocation();

    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Filters
    const [industry, setIndustry] = useState("All");
    const [stage, setStage] = useState("All");
    const [sort, setSort] = useState('name'); // NEW
    const [order, setOrder] = useState('asc'); // NEW
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

    const industries = ['All', 'AI', 'DevTools', 'Fintech', 'Productivity', 'Design', 'Data'];
    const stages = ['All', 'Seed', 'Series A', 'Series B', 'Late Stage', 'Bootstrapped'];

    // Restore from state if available
    useEffect(() => {
        if (location.state) {
            if (location.state.industry) setIndustry(location.state.industry);
            if (location.state.stage) setStage(location.state.stage);
        }
    }, [location.state]);

    // ... (rest of query params)
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get('q') || '';

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 9, // Changed from 12 to 9
                search: searchQuery, // Added search query
                industry,
                stage,
                sort, // Added sort
                order // Added order
            };
            if (industry !== 'All') params.industry = industry;
            if (stage !== 'All') params.stage = stage;

            const res = await API.get("/companies", { params });

            setCompanies(res.data.data || []);
            setTotalPages(res.data.meta?.totalPages || 1);
        } catch (err) {
            console.error("Failed to fetch companies", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSearch = () => {
        const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
        const newSearch = {
            id: Date.now(),
            industry,
            stage,
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem('savedSearches', JSON.stringify([newSearch, ...saved]));
        alert("Search saved to your library!");
    };

    // Debounce filters
    useEffect(() => {
        setPage(1);
        fetchCompanies();
    }, [industry, stage, searchQuery, sort, order]); // Added searchQuery, sort, order

    // Pagination change
    useEffect(() => {
        fetchCompanies();
    }, [page]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <TrendingUp className="text-blue-500" />
                        Market Intelligence
                    </h1>
                    <p className="text-zinc-400">Discover and track high-growth startups.</p>
                </div>

                {/* Moved view mode buttons here */}
                <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={clsx(
                            "p-2 rounded-md transition-all",
                            viewMode === 'grid' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={clsx(
                            "p-2 rounded-md transition-all",
                            viewMode === 'list' ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <ListIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-6 mb-8">
                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[140px]"
                    >
                        {industries.map(i => <option key={i} value={i}>{i} Industry</option>)}
                    </select>

                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[140px]"
                    >
                        {stages.map(s => <option key={s} value={s}>{s} Stage</option>)}
                    </select>

                    {/* New Sort Dropdown */}
                    <select
                        value={`${sort}-${order}`}
                        onChange={(e) => {
                            const [s, o] = e.target.value.split('-');
                            setSort(s);
                            setOrder(o);
                        }}
                        className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-w-[140px]"
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="foundedYear-desc">Newest First</option>
                        <option value="foundedYear-asc">Oldest First</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSaveSearch}
                        className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        title="Save this search filter"
                    >
                        <Save size={16} />
                        Save Search
                    </button>
                    {/* Removed "Showing X results" text */}
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            ) : companies.length === 0 ? (
                <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl p-12 text-center">
                    <Filter className="mx-auto text-zinc-600 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-white mb-2">No companies found</h3>
                    <p className="text-zinc-400">Try adjusting your filters.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {companies.map(c => (
                                <div
                                    key={c.id}
                                    onClick={() => navigate(`/companies/${c.id}`)}
                                    className="group bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                                            <img
                                                src={c.logo}
                                                alt={c.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&background=random` }}
                                            />
                                        </div>
                                        <span className={clsx(
                                            "text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap",
                                            getStageColor(c.stage)
                                        )}>
                                            {c.stage}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{c.name}</h3>
                                    <p className="text-xs text-zinc-500 mb-4 font-mono">{c.domain}</p>

                                    <p className="text-sm text-zinc-400 line-clamp-2 h-10 mb-6 leading-relaxed">
                                        {c.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-800/50 pt-4 mt-auto">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} />
                                            {c.location.split(',')[0]}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                            {c.industry}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {companies.map(c => (
                                <div
                                    key={c.id}
                                    onClick={() => navigate(`/companies/${c.id}`)}
                                    className="group flex items-center gap-6 p-4 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60 rounded-xl cursor-pointer transition-all hover:translate-x-1"
                                >
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                                        <img
                                            src={c.logo}
                                            alt={c.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&background=random` }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div className="md:col-span-1">
                                            <h3 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{c.name}</h3>
                                            <p className="text-xs text-zinc-500 truncate">{c.domain}</p>
                                        </div>

                                        <div className="hidden md:block md:col-span-2">
                                            <p className="text-sm text-zinc-400 truncate">{c.description}</p>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 md:col-span-1">
                                            <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded border border-zinc-700 whitespace-nowrap">
                                                {c.industry}
                                            </span>
                                            <span className={clsx(
                                                "w-2 h-2 rounded-full",
                                                c.stage === 'Seed' ? "bg-emerald-500" : "bg-blue-500"
                                            )} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-8 border-t border-zinc-800 pt-6">
                        <span className="text-sm text-zinc-500">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
