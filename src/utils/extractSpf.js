export const extractSpfRecords = (dnsData) => {
  // we are extracting what we actually need from the responce we got cause it has so many things in it!
  if (!dnsData.Answer) return [];

  return dnsData.Answer.filter((record) => record.type === 16)
    .map((record) => record.data.replace(/"/g, "").trim())
    .filter((txt) => txt.startsWith("v=spf1"));
};
