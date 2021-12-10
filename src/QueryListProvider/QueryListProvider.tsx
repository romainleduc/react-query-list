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

export interface ResponseValues {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  items: any[];
  error: any;
  response: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  paginationMeta?: PaginationMeta;
  loading: boolean;
}

interface QueryListProviderProps {
  onQueryChange: (filters: Filters, pagination?: PaginationPayload) => void;
  responseValues: ResponseValues;
  filters?: Filters;
  pagination?: PaginationPayload;
  children?: React.ReactNode;
  paginationDisabled?: boolean;
  refetch: (filters: Filters, pagination: PaginationPayload) => void;
}

const QueryListProvider = ({
  onQueryChange,
  refetch,
  paginationDisabled,
  responseValues,
  pagination,
  filters = {},
  children,
}: QueryListProviderProps): JSX.Element => {
  const { page, perPage } = pagination || { page: 1, perPage: 15 };
  const {
    queryFilterValues,
    setQueryFilterValues,
    pagination: queryPagination,
  } = useQueryList(
    {
      page,
      perPage,
    },
    filters
  );

  const { items, loading, error, paginationMeta } = responseValues;

  React.useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [queryFilterValues]);

  const setPage = (newPage: number) => {
    if (!paginationDisabled) {
      queryPagination.setPage(newPage);
      onQueryChange(queryFilterValues || {}, {
        page: newPage,
        perPage,
      });
    }
  };

  const setPerPage = (newPerPage: number) => {
    if (!paginationDisabled) {
      queryPagination.setPerPage(newPerPage);
      onQueryChange(queryFilterValues || {}, {
        page,
        perPage: newPerPage,
      });
    }
  };

  const setFilterValues = (newFilterValues: Filters) => {
    if (setQueryFilterValues) {
      setQueryFilterValues(newFilterValues);
      onQueryChange(
        newFilterValues,
        !paginationDisabled
          ? {
              page: queryPagination.page,
              perPage: queryPagination.perPage,
            }
          : undefined
      );
    }
  };

  return (
    <QueryListContext.Provider
      value={{
        refetch,
        items,
        loading,
        error,
        paginationMeta,
        setPage,
        setPerPage,
        filterValues: queryFilterValues,
        setFilterValues,
      }}
    >
      {children}
    </QueryListContext.Provider>
  );
};

export default QueryListProvider;
