import React, { cloneElement, ReactElement, useContext } from 'react';
import QueryListContext from './QueryListContext';

export interface QueryListProps extends React.HTMLAttributes<HTMLDivElement> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  wrapper: ReactElement<any>;
  onItemRender: (value: any, index: number, array: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

const QueryList = ({ onItemRender, wrapper }: QueryListProps): JSX.Element => {
  const { items } = useContext(QueryListContext);

  return cloneElement(wrapper, [], items && items.map(onItemRender));
};

export default QueryList;
