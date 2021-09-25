const createSnippet = (snippet: string | null): string => {
  if (snippet === null) {
    return "";
  }

  return snippet.replace(/(\n)/gm, "").slice(0, 256);
};

export default createSnippet;
