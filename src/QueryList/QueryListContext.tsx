import React from 'react';
import { PaginationMeta } from '../QueryListProvider/QueryListProvider';
import { Filters } from './useQueryList';

interface QueryListContextType {
  // fetched data
  items: any[] | null;
  loading: boolean; // boolean that is true on mount, and false once the data was fetched;
  //filtering
  filterValues?: Filters; // a dictionary of filter values, e.g. { title: 'lorem', nationality: 'fr' }
  setFilterValues?: any;
  error?: any;
  //pagination
  paginationMeta?: PaginationMeta;
  setPage: (newPage: number) => void;
  setPerPage: (newPerPage: number) => void;
  refetch: (filters: Filters, pagination: {
    page: number;
    perPage: number;
  }) => void;
}

const QueryListContext = React.createContext<QueryListContextType>({
  refetch: () => {},
  setPage: () => {},
  setPerPage: () => {},
  items: null,
  loading: false,
  error: null,
});

export default QueryListContext;
