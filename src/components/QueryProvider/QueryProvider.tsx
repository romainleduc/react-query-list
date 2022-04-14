import React from 'react';
import QueryProviderContext, { QueryProviderContextType } from './QueryProviderContext';

interface QueryProviderProps extends QueryProviderContextType {
  children: React.ReactNode;
}

const QueryProvider = (
  {
    dataProvider,
    permissions,
    children,
  }: QueryProviderProps
): JSX.Element => (
  <QueryProviderContext.Provider
    value={{
      dataProvider,
      permissions,
    }}
  >
    {children}
  </QueryProviderContext.Provider>
);

export default QueryProvider;
