export const makeURLfromName = (name: string): string => {
  return name.trim().toLowerCase().replace(/ /g, '-');
};

export const firstLetterLowercase = (name: string): string => {
  if (name.length < 2) {
    return name;
  }
  return name.replace(' ', '_').toLowerCase();
};
