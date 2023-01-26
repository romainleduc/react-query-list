import React from 'react';
import { PaginationMeta } from '../QueryProvider/QueryProviderContext';
import { Filters } from './useQueryList';

export interface QueryListContextType {
  // fetched data
  /* eslint-disable @typescript-eslint/no-explicit-any */
  items: any[] | null;
  error?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  loading: boolean; // boolean that is true on mount, and false once the data was fetched;
  //filtering
  filterValues?: Filters; // a dictionary of filter values, e.g. { title: 'lorem', nationality: 'fr' }
  setFilterValues?: (newFilterValues: Filters) => void;
  paginationMeta?: PaginationMeta;
  refetch: (
    filters: Filters,
    pagination: {
      page: number;
      perPage: number;
    }
  ) => void;
}

const QueryListContext = React.createContext<QueryListContextType>({
  refetch: () => undefined,
  items: null,
  loading: false,
  error: null,
});

export default QueryListContext;
