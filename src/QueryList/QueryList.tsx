import React, { cloneElement, useContext } from 'react';
import QueryListContext from './QueryListContext';

export interface QueryListProps extends React.HTMLAttributes<HTMLDivElement> {
  wrapper: any;
  onItemRender: (value: any, index: number, array: any[]) => void;
  actions?: any;
  pagination?: any;
}

const QueryList = ({
  onItemRender,
  wrapper,
}: QueryListProps): JSX.Element => {
  const { items } = useContext(QueryListContext);

  return cloneElement(
    wrapper,
    [],
    items && items.map(onItemRender)
  );
};

export default QueryList;
