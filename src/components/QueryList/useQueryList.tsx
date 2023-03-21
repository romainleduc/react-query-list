import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Filters = { [key: string]: any };
/* eslint-enable @typescript-eslint/no-explicit-any */

const useQueryList = (
  filters: Filters
): {
  queryFilterValues: Filters;
  setQueryFilterValues: (newFilterValues: Filters) => void;
} => {
  const [filterValues, setFilterValues] = React.useState(filters);

  const handleFilterValues = React.useCallback(
    (newFilterValues: Filters): void => {
      setFilterValues({
        ...newFilterValues,
      });
    },
    [setFilterValues, filterValues]
  );

  return {
    queryFilterValues: filterValues,
    setQueryFilterValues: handleFilterValues,
  };
};

export default useQueryList;
