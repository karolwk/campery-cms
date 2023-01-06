export const makeURLfromName = (name: string): string => {
  return name.trim().toLowerCase().replace(/ /g, '-');
};
