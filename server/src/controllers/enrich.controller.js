import { runEnrichment } from "../services/enrich.service.js";

export const enrichCompany = async (req, res) => {
    try {
        const { websiteUrl } = req.body;

        if (!websiteUrl) {
            return res.status(400).json({ error: "Website URL required" });
        }

        const data = await runEnrichment(websiteUrl);

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Enrichment failed" });
    }
};
