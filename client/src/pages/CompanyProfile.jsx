import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Calendar, Sparkles, Loader2, CheckCircle, Save, ExternalLink, LineChart, Download } from 'lucide-react';
import API from '../services/api';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { getStageColor } from '../utils/styles';

const CompanyProfile = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enriching, setEnriching] = useState(false);
    const [enrichedData, setEnrichedData] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [longLoading, setLongLoading] = useState(false);

    // Load company data
    useEffect(() => {
        const loadCompany = async () => {
            try {
                setLoading(true);
                setLongLoading(false);

                // Set a timeout to show "long loading" message after 5 seconds
                const timer = setTimeout(() => {
                    setLongLoading(true);
                }, 5000);

                const res = await API.get(`/companies/${id}`);

                clearTimeout(timer); // Clear timeout if data returns fast
                setCompany(res.data);

                // Check localStorage for cached enrichment data
                const cached = localStorage.getItem(`enrichment_${id}`);
                if (cached) {
                    setEnrichedData(JSON.parse(cached));
                }

                // Check if saved
                const saved = JSON.parse(localStorage.getItem('savedCompanies') || '[]');
                setIsSaved(saved.some(c => c.id === res.data.id));
            } catch (error) {
                console.error("Failed to load company", error);
            } finally {
                setLoading(false);
                setLongLoading(false);
            }
        };
        loadCompany();
    }, [id]);

    const handleEnrich = async () => {
        if (!company?.domain) return;

        setEnriching(true);
        try {
            // API call to enrich (server might also cache, but we cache here too as requested)
            const { data } = await API.post("/enrich", { websiteUrl: `https://${company.domain}` });

            setEnrichedData(data);
            // Save to localStorage
            localStorage.setItem(`enrichment_${id}`, JSON.stringify(data));
        } catch (error) {
            console.error("Enrichment failed", error);
        } finally {
            setEnriching(false);
        }
    };

    const handleSave = () => {
        const saved = JSON.parse(localStorage.getItem('savedCompanies') || '[]');
        let newSaved;
        if (isSaved) {
            newSaved = saved.filter(c => c.id !== company.id);
        } else {
            newSaved = [...saved, {
                id: company.id,
                name: company.name,
                logo: company.logo,
                industry: company.industry,
                stage: company.stage,
                domain: company.domain
            }];
        }
        localStorage.setItem('savedCompanies', JSON.stringify(newSaved));
        setIsSaved(!isSaved);
    };

    const handleExport = () => {
        if (!enrichedData) return;

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
            company: company,
            enrichment: enrichedData,
            exportedAt: new Date().toISOString()
        }, null, 2));

        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${company.name.replace(/\s+/g, '_')}_intelligence.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-500">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Loading company profile...</p>
                {longLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg max-w-sm text-center"
                    >
                        <p className="text-yellow-500 font-medium mb-1">Server Waking Up 😴</p>
                        <p className="text-xs text-zinc-400">
                            The backend runs on a free instance and sleeps when inactive.
                            Please wait 30-50 seconds for it to restart.
                        </p>
                    </motion.div>
                )}
            </div>
        );
    }

    if (!company) {
        return <div className="p-8 text-center text-zinc-500">Company not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link to="/companies" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={16} />
                Back to Companies
            </Link>

            {/* Header Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex items-start gap-6">
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-24 h-24 rounded-xl bg-white object-contain p-2 shadow-lg"
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random` }}
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-2 flex flex-wrap items-center gap-3 text-white">
                                {company.name}
                                <div className="flex gap-2">
                                    <span className={clsx(
                                        "text-xs px-2.5 py-0.5 rounded-full border whitespace-nowrap",
                                        getStageColor(company.stage)
                                    )}>
                                        {company.stage}
                                    </span>
                                </div>
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-4">
                                {company.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
                                <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                    <Globe size={16} />
                                    {company.domain}
                                    <ExternalLink size={12} />
                                </a>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    {company.location}
                                </div>
                                {company.foundedYear && (
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        Founded {company.foundedYear}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[160px]">
                        <button
                            onClick={handleEnrich}
                            disabled={enriching}
                            className={clsx(
                                "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all shadow-lg",
                                enriching
                                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                    : enrichedData
                                        ? (enrichedData.summary === "AI Extraction Failed" || enrichedData.summary?.includes("Could not scrape"))
                                            ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                            : "bg-green-500/10 text-green-400 border border-green-500/20 shadow-green-900/10"
                                        : "bg-white text-black hover:bg-zinc-200 shadow-purple-500/10 hover:shadow-purple-500/20"
                            )}
                        >
                            {enriching ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Analyzing...
                                </>
                            ) : enrichedData ? (
                                (enrichedData.summary === "AI Extraction Failed" || enrichedData.summary?.includes("Could not scrape")) ? (
                                    <>
                                        <Sparkles size={18} />
                                        Retry Analysis
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Insight Generated
                                    </>
                                )
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Enrich Profile
                                </>
                            )}
                        </button>

                        {enrichedData && (
                            <button
                                onClick={handleExport}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors border border-zinc-700"
                            >
                                <Download size={18} />
                                Export JSON
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            className={clsx(
                                "flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors border",
                                isSaved
                                    ? "bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700"
                                    : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                            )}
                        >
                            <Save size={18} className={isSaved ? "fill-white" : ""} />
                            {isSaved ? "Saved to List" : "Save to List"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Enrichment Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Intelligence */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Section */}
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles size={100} />
                        </div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                            <Sparkles className="text-purple-400" size={20} />
                            AI Intelligence
                        </h3>

                        {enriching ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
                                <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                            </div>
                        ) : enrichedData ? (
                            (enrichedData.summary === "AI Extraction Failed" || enrichedData.summary?.includes("Could not scrape")) ? (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
                                    <p className="font-medium mb-1">Analysis Failed</p>
                                    <p className="text-sm opacity-80">We couldn't extract data from this website. It might be blocked or inaccessible.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Executive Summary</h4>
                                        <p className="text-zinc-300 leading-relaxed text-lg">
                                            {enrichedData.summary}
                                        </p>
                                    </div>

                                    {enrichedData.whatTheyDo && (
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Key Activities</h4>
                                            <div className="space-y-2">
                                                {enrichedData.whatTheyDo.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3 text-zinc-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        ) : (
                            <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded-lg border border-dashed border-zinc-800">
                                <Sparkles className="mx-auto mb-3 opacity-20" size={48} />
                                <p>Click <strong className="text-zinc-300">Enrich Profile</strong> to generate AI insights from their live website.</p>
                            </div>
                        )}
                    </div>

                    {/* Signals Section */}
                    {enrichedData && enrichedData.signals && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-white">Detected Signals</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {enrichedData.signals.map((signal, i) => (
                                    <div key={i} className="bg-zinc-800/50 border border-zinc-800 px-3 py-2 rounded-lg text-sm text-zinc-300 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        {signal}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {enrichedData ? (
                                enrichedData.keywords?.map((keyword, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700">
                                        {keyword}
                                    </span>
                                ))
                            ) : (
                                company.industry?.split(',').map((k, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700">
                                        {k.trim()}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;