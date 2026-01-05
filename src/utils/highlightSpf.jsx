export const highlightSpf = (spf) => {
  // Eita we are using to make the UI a bit more ploshed and colorful hoye show korbe!
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
