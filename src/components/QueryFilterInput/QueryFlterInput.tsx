import React from 'react';
import { useFilterInput } from '../../hooks';

interface QueryFilterInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | any) => void;
  source: string;
  multiple?: boolean;
  component: any;
}

const QueryFilterInput = (
  {
    defaultValue,
    onChange,
    source,
    component = 'input',
    ...other
  }: QueryFilterInputProps
) => {
  const inputProps = useFilterInput({
    defaultValue,
    onChange,
    source,
  });

  return React.createElement(component, { ...inputProps, ...other });
}

export default QueryFilterInput;
