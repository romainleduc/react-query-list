import { HTMLInputTypeAttribute, useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterInput {
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
  onChange?: (eventOrValue: React.ChangeEvent<HTMLInputElement> | any) => void;
  source: string;
  type?: HTMLInputTypeAttribute;
}

const useFilterInput = ({ defaultValue = '', defaultChecked = false, onChange, source, type }: UseFilterInput) => {
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

  const getValue = () => {
    const value = filterValues?.[source];

    if (isCheckedValue()) {
      return { checked: value || defaultChecked }
    }

    return  { value: value || defaultValue };
  }

  return {
    ...getValue(),
    onChange: handleChange,
  }
}

export default useFilterInput;