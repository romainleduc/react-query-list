import React from 'react';

export interface AuthProvider {
  getPermissions: () => string | string[];
}

interface QueryContextType {
  authProvider: AuthProvider;
}

const QueryContext = React.createContext<QueryContextType | null>(null);

export default QueryContext;
