import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QueryListProvider from './QueryListProvider';
import { QueryListContextType } from '../QueryList/QueryListContext';

describe('QueryListProvider', () => {
  test('The setFilterValues method should call onQueryFilterChange callback with new filters', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        {({ setFilterValues }: QueryListContextType) => <button onClick={() => setFilterValues?.({ brand: 'apple' })}>Filter</button>}
      </QueryListProvider>,
    )
  
    fireEvent.click(getByText('Filter'))
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0]).toEqual({ brand: 'apple' });
  });

  test('The onQueryFilterChange callback should be able to update the context', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { getByText } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        {({ filterValues, setFilterValues }: QueryListContextType) => (
          <>
            <span>{`Brand: ${filterValues?.brand || 'null'}`}</span>
            <button onClick={() => setFilterValues?.({ brand: 'apple' })}>Filter</button>
          </>
        )}
      </QueryListProvider>,
    )
  
    expect(screen.getByText(/^Brand:/).textContent).toBe('Brand: null');
    fireEvent.click(getByText('Filter'))
    expect(screen.getByText(/^Brand:/).textContent).toBe('Brand: apple');
  });
  
  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        {({ setFilterValues }: QueryListContextType) => (
          <>
            <button onClick={() => setFilterValues?.({ color: null })}>Filter 1</button>
            <button onClick={() => setFilterValues?.({ color: undefined })}>Filter 2</button>
            <button onClick={() => setFilterValues?.({ color: '' })}>Filter 3</button>
          </>
        )}
      </QueryListProvider>,
    )
  
    fireEvent.click(getByText('Filter 1'));
    fireEvent.click(getByText('Filter 2'));
    fireEvent.click(getByText('Filter 3'));
  
    expect(mockCallback.mock.calls[0][0]).toEqual({});
    expect(mockCallback.mock.calls[1][0]).toEqual({});
    expect(mockCallback.mock.calls[2][0]).toEqual({});
  });
  
  test('The setFilterValues method should not remove filters that have no truth value when the provider has the `disableTruthy` prop', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <QueryListProvider
        disableTruthy
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        {({ setFilterValues }: QueryListContextType) => (
          <>
            <button onClick={() => setFilterValues?.({ color: null })}>Filter 1</button>
            <button onClick={() => setFilterValues?.({ color: undefined })}>Filter 2</button>
            <button onClick={() => setFilterValues?.({ color: '' })}>Filter 3</button>
          </>
        )}
      </QueryListProvider>,
    )
  
    fireEvent.click(getByText('Filter 1'));
    fireEvent.click(getByText('Filter 2'));
    fireEvent.click(getByText('Filter 3'));
  
    expect(mockCallback.mock.calls[0][0]).toEqual({ color: null });
    expect(mockCallback.mock.calls[1][0]).toEqual({ color: undefined });
    expect(mockCallback.mock.calls[2][0]).toEqual({ color: '' });
  });
})