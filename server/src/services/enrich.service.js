import { scrapeWebsite } from "./scrape.service.js";
import { extractCompanyInfo } from "./ai.service.js";

export const runEnrichment = async (url) => {
    const websiteText = await scrapeWebsite(url);

    const extracted = await extractCompanyInfo(websiteText, url);

    return {
        ...extracted,
        sources: [url],
        enrichedAt: new Date().toISOString(),
    };
};
