import React from 'react';
import { useFilterButton } from '../../hooks';

interface QueryFilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  source: string;
  multiple?: boolean;
  component: any;
}

const QueryFilterButton = (
  {
    value = '',
    onClick,
    source,
    multiple,
    component = 'button',
    ...other
  }: QueryFilterButtonProps
) => {
  const buttonProps = useFilterButton({
    value,
    onClick,
    source,
    multiple,
  });

  return React.createElement(component, { ...buttonProps, ...other });
}

export default QueryFilterButton;
