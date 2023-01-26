import useQueryFilter from '../QueryFilter/useQueryFilter';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Filters = { [key: string]: any };
/* eslint-enable @typescript-eslint/no-explicit-any */

const useQueryList = (
  filters?: Filters
): {
  queryFilterValues: Filters | undefined;
  setQueryFilterValues: (newFilterValues: Filters) => void;
} => {
  const { filterValues, setFilterValues } = useQueryFilter(filters);

  return {
    queryFilterValues: filterValues,
    setQueryFilterValues: setFilterValues,
  };
};

export default useQueryList;
