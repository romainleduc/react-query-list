import React from 'react';
import useFilterRadio from '../../hooks/useFilterRadio';

interface QueryFilterInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type'> {
  source: string;
  component?: any;
  value: string;
}

const QueryFilterRadio = ({
  onChange,
  source,
  component = 'input',
  value,
  ...other
}: QueryFilterInputProps) => {
  const inputProps = useFilterRadio({
    onChange,
    source,
    value,
  });

  return React.createElement(component, { ...inputProps, ...other });
};

export default QueryFilterRadio;
