import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Database, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-4 text-white">
            <Icon size={24} />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
);

const Home = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 md:space-y-24 py-8 md:py-12 animate-in fade-in duration-700">

            {/* Hero Section */}
            <section className="text-center space-y-8 py-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Intelligence Engine v1.0
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                    Sourcing Intelligence <br /> for Modern VCs.
                </h1>

                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Discover, track, and enrich company profiles with real-time AI agents.
                    Stop relying on static databases.
                </p>

                <div className="flex items-center justify-center gap-4 pt-4">
                    <Link
                        to="/companies"
                        className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2"
                    >
                        Start Scouting
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/analytics"
                        className="px-8 py-4 bg-zinc-900 text-zinc-300 font-semibold rounded-full hover:bg-zinc-800 transition-all border border-zinc-800 text-center"
                    >
                        View Analytics
                    </Link>
                </div>
            </section>

            {/* Features Grid ("Ads of website") */}
            <section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Benchmarks for the Bold</h2>
                    <p className="text-zinc-400">Why top firms choose VC Scout over Crunchbase.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={Zap}
                        title="Real-time Enrichment"
                        description="Our agents scrape live company websites to extract signals, tech stacks, and team details instantly."
                    />
                    <FeatureCard
                        icon={Target}
                        title="Precision Search"
                        description="Filter by exact growth stage, industry vertical, and geographic signals to find hidden gems."
                    />
                    <FeatureCard
                        icon={Database}
                        title="No Stale Data"
                        description="Unlike static databases, we refresh our index daily ensuring you see the companies as they are today."
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Global Coverage"
                        description="From Silicon Valley to Bangalore, track startups across 150+ countries with localized insights."
                    />
                </div>
            </section>

            {/* Stats / Trust Section */}
            <section className="border-y border-zinc-800 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">15M+</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Companies Indexed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">50k+</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Daily Enriches</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">99%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Data Accuracy</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">24/7</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">AI Agents Active</div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="text-center py-12">
                <h2 className="text-2xl font-bold mb-6">Ready to find the next unicorn?</h2>
                <Link to="/companies" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-2">
                    Go to Dashboard <ArrowRight size={16} />
                </Link>
            </section>
        </div>
    );
};

export default Home;
