export const normalizeDomain = (input) => {
  //  Ekhane we are ensuring jate proper address ensure kora jae by the help of regular expression!
  let value = input.trim().toLowerCase();
  value = value.replace(/^https?:\/\//, "");
  value = value.replace(/\/$/, "");
  return value;
};
