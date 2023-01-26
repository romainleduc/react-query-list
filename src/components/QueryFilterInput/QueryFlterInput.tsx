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
    defaultChecked = false,
    type,
    ...other
  }: QueryFilterInputProps
) => {
  const inputProps = useFilterInput({
    defaultValue,
    defaultChecked,
    onChange,
    source,
    type,
  });

  return React.createElement(component, { ...inputProps, ...other });
}

export default QueryFilterInput;
