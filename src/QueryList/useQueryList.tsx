import useQueryFilter from '../QueryFilter/useQueryFilter';
import usePagination, {
  PaginationPayload,
} from '../QueryPagination/useQueryPagination';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Filters = { [key: string]: any };
/* eslint-enable @typescript-eslint/no-explicit-any */

const useQueryList = (
  pagination: PaginationPayload = {
    page: 1,
    perPage: 6,
  },
  filters?: Filters
): {
  pagination: {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
  };
  queryFilterValues: Filters | undefined;
  setQueryFilterValues: (newFilterValues: Filters) => void;
} => {
  const { filterValues, setFilterValues } = useQueryFilter(filters);
  const { page, perPage, setPage, setPerPage } = usePagination(pagination);

  return {
    pagination: {
      page,
      perPage,
      setPage,
      setPerPage,
    },
    queryFilterValues: filterValues,
    setQueryFilterValues: setFilterValues,
  };
};

export default useQueryList;
