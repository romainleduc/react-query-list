import React from 'react';
import QueryListContext from '../QueryList/QueryListContext';
import useQueryList, { Filters } from '../QueryList/useQueryList';
import { PaginationPayload } from '../QueryPagination/useQueryPagination';
import QueryProviderContext from '../QueryProvider/QueryProviderContext';

interface QueryListProviderProps {
  onQueryChange: (filters: Filters, pagination?: PaginationPayload) => void;
  data: any[];
  error: any;
  response: any;
  loading: boolean;
  filters?: Filters;
  pagination?: PaginationPayload;
  children?: any;
  paginationDisabled?: boolean;
  refetch: (filters: Filters, pagination: PaginationPayload) => void;
}

const QueryListProvider = ({
  onQueryChange,
  refetch,
  paginationDisabled,
  data,
  error,
  loading,
  pagination,
  filters = {},
  children,
}: QueryListProviderProps): JSX.Element => {
  const { dataProvider } = React.useContext(QueryProviderContext);
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
        items: data ? dataProvider.getItems(data): [],
        paginationMeta: data ? dataProvider.getPaginationMeta(data): undefined,
        loading,
        error,
        setPage,
        setPerPage,
        filterValues: queryFilterValues,
        setFilterValues,
      }}
    >
      {typeof children === 'function' ? (
        <QueryListContext.Consumer>
          {children}
        </QueryListContext.Consumer>
      ): children}
    </QueryListContext.Provider>
  );
};

export default QueryListProvider;
