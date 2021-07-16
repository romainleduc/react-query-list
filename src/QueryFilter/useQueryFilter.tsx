import { useCallback, useState } from 'react';

export interface QueryFilterHookResult {
  filterValues: { [key: string]: any } | undefined;
  setFilterValues: (newFilterValues: { [key: string]: any }) => void;
}

const useQueryFilter = (
  defaultFilters: { [key: string]: any } | undefined,
): QueryFilterHookResult => {
  const [filterValues, setFilterValues] = useState(defaultFilters || {});

  const handleFilterValues = useCallback(
    (newFilterValues: { [key: string]: any }): void => {
      setFilterValues({
        ...filterValues,
        ...newFilterValues,
      });
    },
    [setFilterValues, filterValues],
  );

  return {
    filterValues,
    setFilterValues: handleFilterValues,
  };
};

export default useQueryFilter;
