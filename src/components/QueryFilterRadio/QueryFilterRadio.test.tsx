import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryListProvider } from '../QueryListProvider';
import QueryFilterRadio from './QueryFilterRadio';

const CustomInput = (props: any) => (
  <div>
    <span>My custom input</span>
    <input {...props} />
  </div>
);

describe('QueryFilterRadio', () => {
  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn();
    const { getByTestId } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        <QueryFilterRadio
          data-testid="category-filter-1"
          source="category"
          value="smartphones"
        />
      </QueryListProvider>
    );

    expect(getByTestId('category-filter-1')).toHaveAttribute('type', 'radio');
  });

  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        <QueryFilterRadio source="category" value="smartphones" />
      </QueryListProvider>
    );

    expect(container.querySelector('input')).toBeInTheDocument();
  });

  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn();
    const { container, getByText } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{
          category: 'smartphones',
        }}
      >
        <QueryFilterRadio
          component={CustomInput}
          source="category"
          value="smartphones"
        />
      </QueryListProvider>
    );

    expect(getByText('My custom input')).toBeInTheDocument();
    expect(container.querySelector('input')).toHaveAttribute('type', 'radio');
    expect(container.querySelector('input')).toHaveAttribute(
      'value',
      'smartphones'
    );
    expect(container.querySelector('input')).toBeChecked();
  });

  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { getByTestId } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        <QueryFilterRadio
          data-testid="category-filter-1"
          source="category"
          value="smartphones"
        />
      </QueryListProvider>
    );

    expect(getByTestId('category-filter-1')).not.toBeChecked();
    fireEvent.click(getByTestId('category-filter-1'));
    expect(getByTestId('category-filter-1')).toBeChecked();
  });

  test('The setFilterValues method should remove filters that do not have a truthy value', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { getByTestId } = render(
      <QueryListProvider
        data={[]}
        error={false}
        loading={false}
        onQueryFilterChange={mockCallback}
        filters={{}}
      >
        <QueryFilterRadio
          data-testid="category-filter-1"
          source="category"
          value="smartphones"
        />
        <QueryFilterRadio
          data-testid="category-filter-2"
          source="category"
          value="laptop"
        />
      </QueryListProvider>
    );

    expect(getByTestId('category-filter-1')).not.toBeChecked();
    expect(getByTestId('category-filter-2')).not.toBeChecked();
    fireEvent.click(getByTestId('category-filter-1'));
    expect(getByTestId('category-filter-1')).toBeChecked();
    expect(getByTestId('category-filter-2')).not.toBeChecked();
    fireEvent.click(getByTestId('category-filter-2'));
    expect(getByTestId('category-filter-1')).not.toBeChecked();
    expect(getByTestId('category-filter-2')).toBeChecked();
  });
});
