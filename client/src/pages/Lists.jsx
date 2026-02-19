import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Building2 } from 'lucide-react';

const Lists = () => {
    const [savedCompanies, setSavedCompanies] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedCompanies') || '[]');
        setSavedCompanies(saved);
    }, []);

    const removeCompany = (id) => {
        const newSaved = savedCompanies.filter(c => c.id !== id);
        setSavedCompanies(newSaved);
        localStorage.setItem('savedCompanies', JSON.stringify(newSaved));
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-white">My Lists</h1>
            <p className="text-zinc-400 mb-8">Companies you have bookmarked.</p>

            {savedCompanies.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                    <Building2 className="mx-auto text-zinc-600 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-white mb-2">No companies saved yet</h3>
                    <p className="text-zinc-400">Go to <Link to="/companies" className="text-blue-400 hover:underline">Companies</Link> to start building your list.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {savedCompanies.map(company => (
                        <div key={company.id} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-all group">
                            <Link to={`/companies/${company.id}`} className="flex items-center gap-4 flex-1">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-12 h-12 rounded-lg bg-white object-contain p-1"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random` }}
                                />
                                <div>
                                    <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{company.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <span>{company.industry}</span>
                                        <span>•</span>
                                        <span>{company.stage}</span>
                                    </div>
                                </div>
                            </Link>

                            <button
                                onClick={() => removeCompany(company.id)}
                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Lists;
