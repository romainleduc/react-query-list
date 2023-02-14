import React, { HTMLInputTypeAttribute, useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterCheckboxProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  source: string;
  name: string;
}

const useFilterCheckbox = ({ onChange, source, name }: UseFilterCheckboxProps) => {
  const { setFilterValues, filterValues } = useContext(QueryListContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }

    if (!setFilterValues) {
      return;
    }

    let filterValue = filterValues?.[source] || [];

    if (!Array.isArray(filterValue)) {
      return;
    }

    if (!event.target.checked) {
      filterValue = filterValue.filter(name => name !== event.target.name);
    } else {
      filterValue.push(event.target.name);
    }

    setFilterValues({
      ...filterValues,
      [source]: filterValue,
    });
  }

  return {
    type: 'checkbox',
    name,
    checked: Boolean(filterValues?.[source]?.includes(name)),
    onChange: handleChange,
  }
}

export default useFilterCheckbox;