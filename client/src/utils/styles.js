export const getStageColor = (stage) => {
    const colors = {
        'Pre-Seed': "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        'Seed': "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        'Series A': "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        'Series B': "bg-orange-500/10 text-orange-400 border-orange-500/20",
        'Series C': "bg-red-500/10 text-red-400 border-red-500/20",
        'Series D': "bg-red-500/10 text-red-500 border-red-500/20",
        'Series E': "bg-red-500/10 text-red-600 border-red-500/20",
        'IPO': "bg-red-500/10 text-red-700 border-red-500/20",
        'Acquired': "bg-red-500/10 text-red-700 border-red-500/20",
    };
    return colors[stage] || "bg-zinc-800 text-zinc-400 border-zinc-700";
};
