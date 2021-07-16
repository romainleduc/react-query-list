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
  //pagination
  paginationMeta: PaginationMeta;
  setPage?: (newPage: number) => void;
  setPerPage?: (newPerPage: number) => void;
}

const QueryListContext = React.createContext<QueryListContextType>({
  items: null,
  loading: false,
  paginationMeta: {
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
  },
});

export default QueryListContext;
