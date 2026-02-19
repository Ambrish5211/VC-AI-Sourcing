const cache = new Map();

// TTL: 24 hrs (change if needed)
const CACHE_TTL = 1000 * 60 * 60 * 24;

export const getCachedEnrichment = (url) => {
    const item = cache.get(url);

    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > CACHE_TTL;

    if (isExpired) {
        cache.delete(url);
        return null;
    }

    return item.data;
};

export const setCachedEnrichment = (url, data) => {
    cache.set(url, {
        data,
        timestamp: Date.now(),
    });
};
