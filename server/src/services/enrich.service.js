import { scrapeWebsite } from "./scrape.service.js";
import { extractCompanyInfo } from "./ai.service.js";
import {
    getCachedEnrichment,
    setCachedEnrichment,
} from "../utils/enrichCache.js";

export const runEnrichment = async (url) => {

    // check cache first
    const cached = getCachedEnrichment(url);
    if (cached) {
        return cached;
    }

    const websiteText = await scrapeWebsite(url);
    const extracted = await extractCompanyInfo(websiteText, url);

    const result = {
        ...extracted,
        sources: [url],
        enrichedAt: new Date().toISOString(),
    };

    // Only cache if successful
    const isFailure = result.summary === "AI Extraction Failed" ||
        result.summary.includes("Could not scrape") ||
        result.signals?.includes("Scraping failed");

    if (!isFailure) {
        setCachedEnrichment(url, result);
    }

    return result;
};
