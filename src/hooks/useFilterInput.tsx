import { useContext } from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterInput {
  defaultValue?: string;
  onChange?: any;
  source: string;
}

const useFilterInput = ({ defaultValue = '', onChange, source }: UseFilterInput) => {
  const { setFilterValues, filterValues } = useContext(QueryListContext);

  const handleChange = (event: any) => {
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
  }

  return {
    value: filterValues?.[source] || defaultValue,
    onChange: handleChange,
  }
}

export default useFilterInput;