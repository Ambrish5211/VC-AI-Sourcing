import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Search, Bell, Building2 } from "lucide-react";
import Companies from "./pages/Companies";
import Sidebar from "./layout/Sidebar";
import CompanyProfile from "./pages/CompanyProfile";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Saved from "./pages/Saved";
import API from "./services/api";

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCompanies = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await API.get("/companies", { params: { search: query, limit: 3 } });
        setResults(res.data.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search failed", error);
      }
    };

    const timer = setTimeout(searchCompanies, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (companyId) => {
    navigate(`/companies/${companyId}`);
    setQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-xl" ref={wrapperRef}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
      <input
        type="text"
        placeholder="Global search (Companies)..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-zinc-700 transition-colors text-white placeholder:text-zinc-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="py-2">
            {results.map((company) => (
              <div
                key={company.id}
                onClick={() => handleSelect(company.id)}
                className="px-4 py-3 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random` }}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{company.name}</div>
                  <div className="text-xs text-zinc-500">{company.industry} • {company.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-black text-white font-sans">
        <Sidebar />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Global Header */}
          <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm z-20">
            <div className="flex items-center gap-4 flex-1">
              <GlobalSearch />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </header>

          {/* Main Content Scroll Area */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyProfile />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/saved" element={<Saved />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
