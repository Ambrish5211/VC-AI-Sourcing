import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeWebsite = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Cache-Control": "max-age=0"
            },
            timeout: 10000
        });

        const $ = cheerio.load(data);

        // remove scripts/styles
        $("script, style, noscript").remove();

        const text = $("body").text().replace(/\s+/g, " ").trim();

        return text.slice(0, 15000); // limit tokens
    } catch (err) {
        console.log("Scrape failed:", err.message);
        return "";
    }
};
