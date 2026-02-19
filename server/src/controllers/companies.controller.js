import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { searchCompanies } from "../services/search.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../data/companies.json");

// Helper to load data
const loadCompanies = async () => {
    const data = await readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
};

export const getCompanies = async (req, res) => {
    try {
        let companies = await loadCompanies();

        // 1. Search (Fuse.js)
        const { search } = req.query;
        if (search) {
            companies = searchCompanies(companies, search);
        }

        // 2. Filtering
        const { industry, stage, location } = req.query;

        if (industry && industry !== "All") {
            companies = companies.filter(c => c.industry === industry);
        }

        if (stage && stage !== "All") {
            companies = companies.filter(c => c.stage === stage);
        }

        if (location) {
            companies = companies.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
        }

        // 3. Sorting
        const { sort = "name", order = "asc" } = req.query;
        companies.sort((a, b) => {
            // Handle string vs number comparison if needed, currently all strings/nums
            if (a[sort] < b[sort]) return order === "asc" ? -1 : 1;
            if (a[sort] > b[sort]) return order === "asc" ? 1 : -1;
            return 0;
        });

        // 4. Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const total = companies.length;
        const results = companies.slice(startIndex, endIndex);

        res.json({
            data: results,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Get Companies Error:", error);
        res.status(500).json({ error: "Failed to fetch companies" });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companies = await loadCompanies();
        const company = companies.find(c => c.id === req.params.id);

        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.json(company);
    } catch (error) {
        console.error("Get Company Error:", error);
        res.status(500).json({ error: "Failed to fetch company" });
    }
};
