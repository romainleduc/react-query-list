import React from 'react';
import QueryContext, { AuthProvider } from './QueryContext';

interface QueryProviderProps {
  authProvider: AuthProvider;
  children: any;
}

const QueryProvider = ({ authProvider, children }: QueryProviderProps) => {
  return (
    <QueryContext.Provider
      value={{
        authProvider,
      }}
    >
    {children}
  </QueryContext.Provider>
  )
}

export default QueryProvider;