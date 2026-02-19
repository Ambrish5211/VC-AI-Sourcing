
import Fuse from "fuse.js";

const options = {
    keys: [
        "name",
        "description",
        "industry",
        "location"
    ],
    threshold: 0.3, // Lower = more exact match
    includeScore: true
};

export const searchCompanies = (companies, query) => {
    if (!query) return companies;

    const fuse = new Fuse(companies, options);
    const results = fuse.search(query);

    return results.map(result => result.item);
};
