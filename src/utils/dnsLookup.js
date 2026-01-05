export const fetchTxtRecords = async (domain) => {
  // Ekahen we are using the cloudflare ens service for looking up the domain stuff
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
