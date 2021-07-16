import React, { useContext } from 'react';
import QueryContext from '../QueryProvider/QueryContext';

export interface QueryToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  permissions?: string[];
}

const QueryToolbar = ({
  permissions,
  ...other
}: QueryToolbarProps): JSX.Element | null => {
  const { authProvider } = useContext(QueryContext) || {};

  const hasPermissions = (permissions: string | string[]): boolean => {
    if (authProvider) {
      let userPermissions = authProvider.getPermissions();

      if (!Array.isArray(userPermissions)) {
        userPermissions = [userPermissions];
      }

      return userPermissions.some((userPermission: string) => permissions.indexOf(userPermission) >= 0);
    }

    return false;
  }

  if (!permissions || hasPermissions(permissions)) {
    return <div {...other} />;
  }

  return null;
};

export default QueryToolbar;
