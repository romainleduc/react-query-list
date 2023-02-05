import React from 'react';
import QueryListContext from '../QueryList/QueryListContext';
import useQueryList, { Filters } from '../QueryList/useQueryList';
import { PaginationPayload } from '../QueryPagination/useQueryPagination';
import QueryProviderContext from '../QueryProvider/QueryProviderContext';

export interface QueryListProviderProps {
  name?: string;
  disableTruthy?: boolean;
  enableReinitialize?: boolean;
  onQueryFilterChange: (filters: Filters, setQueryFilterValues?: (newFilterValues: Filters) => void) => void;
  data: any[];
  error: any;
  response?: any;
  loading: boolean;
  filters?: Filters;
  children?: any;
  refetch?: (filters: Filters, pagination: PaginationPayload) => void;
}

const QueryListProvider = ({
  disableTruthy,
  name="data",
  enableReinitialize,
  onQueryFilterChange,
  refetch,
  data,
  error,
  loading,
  filters = {},
  children,
}: QueryListProviderProps): JSX.Element => {
  const { dataProvider } = React.useContext(QueryProviderContext);
  const {
    queryFilterValues,
    setQueryFilterValues,
  } = useQueryList(filters);

  React.useEffect(() => {
    if (enableReinitialize) {
      setQueryFilterValues(filters);
    }
  }, [filters, enableReinitialize]);

  const setFilterValues = (newFilterValues: Filters) => {
    if (setQueryFilterValues) {
      if (!disableTruthy) {
        Object.keys(newFilterValues).forEach((key) => {
          if (!newFilterValues[key]) {
            delete newFilterValues[key];
          }
        })
      }

      onQueryFilterChange(
        newFilterValues,
        setQueryFilterValues,
      );
    }
  };

  return (
    <QueryListContext.Provider
      value={{
        refetch,
        items: data ? dataProvider.getItems(data, name): [],
        paginationMeta: data ? dataProvider.getPaginationMeta(data): undefined,
        loading,
        error,
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
