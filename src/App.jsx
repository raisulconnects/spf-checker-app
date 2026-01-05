import "./App.css";
import { useState } from "react";

function App() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [spfRecords, setSpfRecords] = useState([]);

  const normalizeDomain = (input) => {
    let value = input.trim().toLowerCase();

    value = value.replace(/^https?:\/\//, "");
    value = value.replace(/\/$/, "");

    return value;
  };

  const isValidDomain = (value) => {
    const domainRegex = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;

    return domainRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSpfRecords([]);

    const normalized = normalizeDomain(domain);

    if (!normalized) {
      setError("Please enter a domain name.");
      return;
    }

    if (!isValidDomain(normalized)) {
      setError("Please enter a valid domain name.");
      return;
    }

    console.log("Normalized domain:", normalized);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">SPF Checker</h1>

        {/* This is where we place the form, Might make it better later on */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain Name
            </label>
            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Check SPF
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
