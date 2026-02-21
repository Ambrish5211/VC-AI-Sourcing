import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search, ArrowRight, Filter } from 'lucide-react';

const Saved = () => {
    const navigate = useNavigate();
    const [savedSearches, setSavedSearches] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
        setSavedSearches(saved);
    }, []);

    const removeSearch = (id, e) => {
        e.stopPropagation();
        const newSaved = savedSearches.filter(s => s.id !== id);
        setSavedSearches(newSaved);
        localStorage.setItem('savedSearches', JSON.stringify(newSaved));
    };

    const applySearch = (search) => {
        const params = new URLSearchParams();
        if (search.industry && search.industry !== 'All') params.set('industry', search.industry);
        if (search.stage && search.stage !== 'All') params.set('stage', search.stage);

        navigate(`/companies?${params.toString()}`);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-white">Saved Searches</h1>
            <p className="text-zinc-400 mb-8">Quickly access your favorite market segments.</p>

            {savedSearches.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                    <Filter className="mx-auto text-zinc-600 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-white mb-2">No saved searches</h3>
                    <p className="text-zinc-400">Filter companies and click "Save Search" to add them here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {savedSearches.map(search => (
                        <div
                            key={search.id}
                            onClick={() => applySearch(search)}
                            className="flex items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                    <Search size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg mb-1 flex items-center gap-2">
                                        {search.industry === 'All' ? 'All Industries' : search.industry}
                                        <span className="text-zinc-600">•</span>
                                        {search.stage === 'All' ? 'All Stages' : search.stage}
                                    </h3>
                                    <p className="text-sm text-zinc-500">Saved on {search.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-medium">
                                    View Results <ArrowRight size={16} />
                                </div>
                                <button
                                    onClick={(e) => removeSearch(search.id, e)}
                                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Saved;
