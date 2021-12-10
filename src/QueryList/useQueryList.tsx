import useQueryFilter from '../QueryFilter/useQueryFilter';
import usePagination, { PaginationPayload } from '../QueryPagination/useQueryPagination';

export type Filters = { [key: string]: any };

const useQueryList = (
  pagination: PaginationPayload = {
    page: 1,
    perPage: 6,
  },
  filters?: Filters,
) => {
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
