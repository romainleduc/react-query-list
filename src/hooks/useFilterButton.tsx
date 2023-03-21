import React from 'react';
import { QueryListContext } from '../components/QueryList';

interface UseFilterButtonProps {
  value: string;
  multiple?: boolean;
  onClick?: any;
  source: string;
}

const useFilterButton = ({
  value,
  multiple,
  onClick,
  source,
}: UseFilterButtonProps) => {
  const { setFilterValues, filterValues } = React.useContext(QueryListContext);

  const isSelected = (): boolean => {
    const filterValue = filterValues?.[source];

    if (!filterValue) {
      return false;
    }

    if (Array.isArray(filterValue)) {
      return filterValue.includes(value);
    }

    return filterValue === value;
  };

  const handleClick = (event: any) => {
    if (onClick) {
      onClick(event);
    }

    if (!setFilterValues) {
      return;
    }

    if (multiple) {
      let filterValue = filterValues?.[source];

      if (filterValue && !Array.isArray(filterValue)) {
        console.warn('Value should be array when multiple is true');
        return;
      }

      if (!filterValue) {
        filterValue = [];
      }

      setFilterValues({
        ...filterValues,
        [source]: isSelected()
          ? filterValue.filter((itemValue: any) => itemValue !== value)
          : [...filterValue, value],
      });
    } else {
      setFilterValues({
        ...filterValues,
        [source]: isSelected() ? undefined : value,
      });
    }
  };

  return {
    value,
    onClick: handleClick,
    selected: isSelected(),
  };
};

export default useFilterButton;
