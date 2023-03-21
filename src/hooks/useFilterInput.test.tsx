import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useFilterInput from './useFilterInput';
import { queryListProviderWrapper as wrapper } from 'test-utils';

test('The default value should be empty string', () => {
  const { result } = renderHook(
    () =>
      useFilterInput({
        source: 'category',
      }),
    {
      wrapper,
    }
  );

  expect(result.current.value).toBe('');
});

test('The default value should be editable', () => {
  const { result } = renderHook(
    () =>
      useFilterInput({
        defaultValue: 'laptops',
        source: 'category',
      }),
    {
      wrapper,
    }
  );

  expect(result.current.value).toBe('laptops');
});

test('The default value should not override the provider one', () => {
  const { result } = renderHook(
    () =>
      useFilterInput({
        defaultValue: 'laptops',
        source: 'category',
      }),
    {
      wrapper,
      initialProps: {
        filters: {
          category: 'smartphones',
        },
      },
    }
  );

  expect(result.current.value).toBe('smartphones');
});

test('The value should update with the context', () => {
  const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
  const { result } = renderHook(
    () =>
      useFilterInput({
        source: 'category',
      }),
    {
      wrapper,
      initialProps: {
        onQueryFilterChange: mockCallback,
        filters: {
          brand: 'apple',
          category: 'laptops',
        },
      },
    }
  );

  act(() => {
    result.current.onChange('smartphones');
  });

  expect(result.current.value).toBe('smartphones');
});

test('The onChange should call the callback onQueryFilterChange by modifying only the filter concerned', () => {
  const mockCallback = jest.fn();
  const { result } = renderHook(
    () =>
      useFilterInput({
        source: 'category',
      }),
    {
      wrapper,
      initialProps: {
        onQueryFilterChange: mockCallback,
        filters: {
          brand: 'apple',
          category: 'laptops',
        },
      },
    }
  );

  act(() => {
    result.current.onChange('smartphones');
  });

  expect(mockCallback.mock.calls[0][0]).toEqual({
    brand: 'apple',
    category: 'smartphones',
  });
});
