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

const useFilterInput = ({ defaultValue = '', defaultChecked = false, onChange, source, type, value }: UseFilterInput) => {
  const { setFilterValues, filterValues } = useContext(QueryListContext);

  const isCheckedValue = () => {
    if (type) {
      return ['checkbox', 'radio'].includes(type);
    }

    return false;
  }

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
    } else if (isCheckedValue()) {
      newValue = eventOrValue.target.checked;
    } else {
      newValue = eventOrValue.target.value;
    }

    setFilterValues({
      ...filterValues,
      [source]: newValue,
    });
  }

  return {
    name: source,
    value: value || filterValues?.[source] || defaultValue,
    checked: isCheckedValue() && (Boolean(filterValues?.[source]) || defaultChecked),
    onChange: handleChange,
  }
}

export default useFilterInput;