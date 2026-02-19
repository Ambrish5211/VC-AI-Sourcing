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
        console.log("Returning cached enrichment");
        return cached;
    }

    console.log("Running fresh enrichment...");

    const websiteText = await scrapeWebsite(url);
    const extracted = await extractCompanyInfo(websiteText, url);

    const result = {
        ...extracted,
        sources: [url],
        enrichedAt: new Date().toISOString(),
    };

    //  store in cache
    setCachedEnrichment(url, result);

    return result;
};
