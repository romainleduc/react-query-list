import React from 'react';

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

interface DataProvider {
  getItems: (data: any, name: string) => any[];
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
