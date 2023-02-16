import { useCallback, useState } from 'react';
import { Filters } from '../QueryList/useQueryList';

export interface QueryFilterHookResult {
  filterValues: Filters | undefined;
  setFilterValues: (newFilterValues: Filters) => void;
}

const useQueryFilter = (
  defaultFilters: Filters | undefined
): QueryFilterHookResult => {
  const [filterValues, setFilterValues] = useState(defaultFilters || {});

  const handleFilterValues = useCallback(
    (newFilterValues: Filters): void => {
      setFilterValues({
        ...newFilterValues,
      });
    },
    [setFilterValues, filterValues]
  );

  return {
    filterValues,
    setFilterValues: handleFilterValues,
  };
};

export default useQueryFilter;
