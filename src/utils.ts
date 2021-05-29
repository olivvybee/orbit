export const sentenceCase = (str: string) => {
  const withSpaces = str.replace(
    /([A-Z])/g,
    (c: string) => ` ${c.toLowerCase()}`
  );
  const withCapital = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  return withCapital.trim();
};
