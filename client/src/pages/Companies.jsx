import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Companies() {
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const res = await API.get("/companies", {
                params: { page, limit: 5 }
            });

            setCompanies(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCompanies();
    }, [page]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Companies</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-800">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="p-3 text-left">Name</th>
                            <th>Sector</th>
                            <th>Stage</th>
                            <th>Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {companies.map(c => (
                            <tr
                                key={c.id}
                                className="border-t border-gray-800 hover:bg-gray-900 cursor-pointer"
                                onClick={() => navigate(`/companies/${c.id}`)}
                            >
                                <td className="p-3">{c.name}</td>
                                <td>{c.sector}</td>
                                <td>{c.stage}</td>
                                <td>{c.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex gap-2 mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-800"
                >
                    Prev
                </button>

                <span>Page {page} / {totalPages}</span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
