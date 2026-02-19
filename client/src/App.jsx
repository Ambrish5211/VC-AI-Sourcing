import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./pages/Companies";
import Sidebar from "./layout/Sidebar";
import CompanyProfile from "./pages/CompanyProfile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyProfile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
