import { useCallback, useMemo } from "react";

type FilterConfig<T> = {
  data?: T[];
  searchValue: string;
  searchKeys: (keyof T)[];
};

export function useDataFilter<T extends object>({
  data = [],
  searchValue,
  searchKeys,
}: FilterConfig<T>) {
  const filterData = useCallback(
    (items: T[]) => {
      if (!searchValue.trim()) {
        return items;
      }

      const searchLower = searchValue.toLowerCase().trim();

      return items.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchLower);
          }
          return false;
        })
      );
    },
    [searchValue, searchKeys]
  );

  const filteredData = useMemo(() => filterData(data), [data, filterData]);

  return filteredData;
}
