import { useEffect } from 'react';
import useQueryFilter from '../QueryFilter/useQueryFilter';
import usePagination, { PaginationPayload } from '../QueryPagination/useQueryPagination';

export type Filters = { [key: string]: any };

const useQueryList = (
  pagination: PaginationPayload = {
    page: 1,
    perPage: 6,
  },
  refetch?: (filters: Filters, pagination: PaginationPayload) => void,
  filters?: Filters,
) => {
  const { filterValues, setFilterValues } = useQueryFilter(filters);
  const { page, perPage, setPage, setPerPage } = usePagination(pagination);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [filterValues]);

  const setFilterValuesWithRefecth = (newFilterValues: { [key: string]: any }) => {
    setFilterValues(newFilterValues);
    refetch?.(newFilterValues, pagination);
  }

  const setPageWithRefetch = (newPage: number) => {
    setPage(newPage);
    refetch?.(filterValues || {}, {
      page: newPage,
      perPage,
    });
  }

  const setPerPageWithRefetch = (newPerPage: number) => {
    setPerPage(newPerPage);
    refetch?.(filterValues || {}, {
      page,
      perPage: newPerPage,
    });
  }

  return {
    pagination: {
      page,
      perPage,
      setPage: setPageWithRefetch,
      setPerPage: setPerPageWithRefetch,
    },
    filters: [filterValues, setFilterValuesWithRefecth],
  };
};

export default useQueryList;
