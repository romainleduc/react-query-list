import React from 'react';
import QueryListContext from '../QueryList/QueryListContext';
import useQueryList, { Filters } from '../QueryList/useQueryList';
import { PaginationPayload } from '../QueryPagination/useQueryPagination';

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface QueryListProviderProps {
  items?: any,
  error?: any;
  loading: boolean;
  page?: number;
  perPage?: number;
  children?: React.ReactNode;
  paginationDisabled?: boolean;
  filters?: Filters;
  refetch?: (filters: Filters, pagination: PaginationPayload) => void;
  paginationMeta?: PaginationMeta;
}

const QueryListProvider = ({
  refetch,
  items,
  loading = false,
  paginationMeta,
  page = 1,
  perPage = 25,
  filters = {},
  children,
}: QueryListProviderProps) => {
  const { filters: queryFilters, pagination } = useQueryList(
    {
      page,
      perPage,
    },
    refetch,
    filters,
  );

  return (
    <QueryListContext.Provider
      value={{
        items,
        loading,
        setPage: pagination.setPage,
        setPerPage: pagination.setPerPage,
        paginationMeta: {
          page: paginationMeta?.page || 0,
          per_page: paginationMeta?.per_page || 0,
          total: paginationMeta?.total || 0,
          total_pages: paginationMeta?.total_pages || 0,
        },
        filterValues: queryFilters[0],
        setFilterValues: queryFilters[1],
      }}
    >
      {children}
    </QueryListContext.Provider>
  );
};

export default QueryListProvider;
