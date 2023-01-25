import { HTMLInputTypeAttribute, useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterInput {
  defaultValue?: string | number | readonly string[];
  onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | any) => void;
  source: string;
  type?: HTMLInputTypeAttribute
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

    if (!eventOrValue.target) {
      newValue = eventOrValue;
    } else if (type === 'checkbox' || type === 'radio') {
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
    value: filterValues?.[source] || defaultValue,
    onChange: handleChange,
  }
}

export default useFilterInput;