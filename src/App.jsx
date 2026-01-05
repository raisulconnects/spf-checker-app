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

  const fetchTxtRecords = async (domain) => {
    const endpoint = `https://cloudflare-dns.com/dns-query?name=${domain}&type=TXT`;

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/dns-json",
      },
    });

    if (!response.ok) {
      throw new Error("DNS lookup failed");
    }

    return response.json();
  };

  const extractSpfRecords = (dnsData) => {
    if (!dnsData.Answer) return [];

    // Return e amra jei object pacchi, we go with the answer portion here!
    return dnsData.Answer.filter((record) => record.type === 16) // TXT
      .map((record) =>
        record.data
          .replace(/"/g, "") // remove quotes
          .trim()
      )
      .filter((txt) => txt.startsWith("v=spf1"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSpfRecords([]);
    setLoading(true);

    const normalized = normalizeDomain(domain);

    if (!normalized) {
      setError("Please enter a domain name.");
      setLoading(false);
      return;
    }

    if (!isValidDomain(normalized)) {
      setError("Please enter a valid domain name.");
      setLoading(false);
      return;
    }

    try {
      const dnsData = await fetchTxtRecords(normalized);
      console.log(dnsData);
      const spf = extractSpfRecords(dnsData);
      console.log(spf);

      if (spf.length === 0) {
        setError("No SPF record found for this domain.");
      } else {
        setSpfRecords(spf);
      }
    } catch (err) {
      setError("Unable to fetch DNS records. Please try again.", err.message);
    } finally {
      setLoading(false);
    }
  };

  // For Making it more UX Friendly!
  const highlightSpf = (spf) => {
    const tokens = spf.split(" ");

    return tokens.map((token, index) => {
      if (token.startsWith("include:")) {
        return (
          <span key={index} className="text-blue-600 font-medium">
            {token}{" "}
          </span>
        );
      }

      if (token.startsWith("redirect=")) {
        return (
          <span key={index} className="text-purple-600 font-medium">
            {token}{" "}
          </span>
        );
      }

      return <span key={index}>{token} </span>;
    });
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
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Checking..." : "Check SPF"}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
        {spfRecords.length > 0 && (
          <div className="mt-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">
              SPF Record(s):
            </h2>

            {spfRecords.map((record, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"
              >
                {highlightSpf(record)}

                <div className="mt-2 text-xs text-gray-500 pt-5">
                  <span className="text-blue-600 font-medium">• include:</span>{" "}
                  included domain •{" "}
                  <span className="text-purple-600 font-medium">redirect=</span>{" "}
                  redirected SPF
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
