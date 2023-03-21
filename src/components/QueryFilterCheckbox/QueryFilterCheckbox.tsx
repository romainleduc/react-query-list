import React from 'react';
import useFilterCheckbox from '../../hooks/useFilterCheckbox';

interface QueryFilterCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type'> {
  source: string;
  component: any;
  name: string;
}

const QueryFilterCheckbox = ({
  onChange,
  source,
  component = 'input',
  name,
  ...other
}: QueryFilterCheckboxProps) => {
  const inputProps = useFilterCheckbox({
    onChange,
    source,
    name,
  });

  return React.createElement(component, { ...inputProps, ...other });
};

export default QueryFilterCheckbox;
