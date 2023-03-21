import React, { useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterRadioProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  source: string;
  value: string;
}

const useFilterRadio = ({ onChange, source, value }: UseFilterRadioProps) => {
  const { setFilterValues, filterValues } = useContext(QueryListContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }

    if (!setFilterValues) {
      return;
    }

    setFilterValues({
      ...filterValues,
      [source]: event.target.value,
    });
  };

  return {
    type: 'radio',
    name: source,
    value,
    checked: filterValues?.[source] === value,
    onChange: handleChange,
  };
};

export default useFilterRadio;
