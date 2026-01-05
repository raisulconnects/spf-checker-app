export const isValidDomain = (value) => {
  // this one ensures the domains are correct or not!
  const domainRegex = /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(value);
};
