import React from 'react';
import { PaginationMeta } from '../types/PaginationMeta';

interface DataProvider {
  getItems: (data: any) => any[];
  getPaginationMeta: (data: any) => PaginationMeta;
}

export interface QueryProviderContextType {
  dataProvider: DataProvider;
  permissions?: () => string | string[];
}

const QueryProviderContext = React.createContext<QueryProviderContextType>({
  dataProvider: {
    getItems: (data) => {
      return data;
    },
    getPaginationMeta: ({ page, perPage, total, totalPages }) => {
      return {
        page,
        perPage,
        total,
        totalPages,
      }
    }
  }
});

export default QueryProviderContext;
