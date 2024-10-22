function createRegExp(item: any) {
  const keys = Object.keys(item).join("|");
  return new RegExp("\\b(" + keys + ")\\b", "g");
}

function getCustomFilter<Data = unknown>(query: string) {
  let q: string | null = null;

  return (scope: Data) => {
    try {
      q = q || query.replace(createRegExp(scope), `scope.$1`);
      return eval(q);
    } catch (er) {
      throw new Error("CustomFilterError: " + query);
    }
  };
}

export function useFilter<Data = unknown>(query: string) {
  const filter = getCustomFilter<Data>(query);

  return (items: Data[]): Data[] => {
    return filter ? items.filter((item) => filter(item)) : [];
  };
}
