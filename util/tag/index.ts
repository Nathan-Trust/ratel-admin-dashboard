export const formatTagWithAtSymbol = (tag: string): string => {
  if (!tag) return '';
  // Remove any existing @ symbol to avoid duplicates
  const cleanTag = tag.replace(/^@+/, '');
  // Add @ symbol at the beginning
  return `@${cleanTag}`;
};
