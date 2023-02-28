import React, { HTMLInputTypeAttribute, useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterInput {
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
  onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | any) => void;
  source: string;
  type?: HTMLInputTypeAttribute;
  value?: any;
}

const useFilterInput = ({ defaultValue = '', onChange, source, type }: UseFilterInput) => {
  const { setFilterValues, filterValues } = useContext(QueryListContext);

  const handleChange = (eventOrValue: React.ChangeEvent<HTMLInputElement> | any) => {
    if (onChange) {
      onChange(eventOrValue);
    }

    if (!setFilterValues) {
      return;
    }

    let newValue;
    
    if (!eventOrValue || !eventOrValue.target) {
      newValue = eventOrValue;
    } else {
      newValue = eventOrValue.target.value;
    }

    setFilterValues({
      ...filterValues,
      [source]: newValue,
    });
  }

  return {
    type,
    name: source,
    value: filterValues?.[source] || defaultValue,
    onChange: handleChange,
  }
}

export default useFilterInput;