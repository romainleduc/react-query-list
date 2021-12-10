import React from 'react';
import QueryContext, { AuthProvider } from './QueryContext';

interface QueryProviderProps {
  authProvider: AuthProvider;
  children: React.Component;
}

const QueryProvider = ({
  authProvider,
  children,
}: QueryProviderProps): JSX.Element => {
  return (
    <QueryContext.Provider
      value={{
        authProvider,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;
