import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { queryListProviderWrapper as wrapper } from 'test-utils';
import useFilterCheckbox from './useFilterCheckbox';

describe('useFilterRadio', () => {
  test('Should return type "checkbox"', () => {
    const { result } = renderHook(
      () =>
        useFilterCheckbox({
          source: 'categories',
          name: 'smartphones',
        }),
      {
        wrapper,
      }
    );

    expect(result.current.type).toBe('checkbox');
  });

  test('The default value should be false', () => {
    const { result } = renderHook(
      () =>
        useFilterCheckbox({
          source: 'categories',
          name: 'smartphones',
        }),
      {
        wrapper,
      }
    );

    expect(result.current.checked).toBe(false);
  });

  test('The value should be true if source array includes name', () => {
    const { result } = renderHook(
      () =>
        useFilterCheckbox({
          source: 'categories',
          name: 'smartphones',
        }),
      {
        wrapper,
        initialProps: {
          filters: {
            categories: ['smartphones'],
          },
        },
      }
    );

    expect(result.current.checked).toBe(true);
  });

  test('The checked value should update with the context', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { result } = renderHook(
      () =>
        useFilterCheckbox({
          source: 'categories',
          name: 'smartphones',
        }),
      {
        wrapper,
        initialProps: {
          onQueryFilterChange: mockCallback,
          filters: {
            categories: [],
          },
        },
      }
    );

    act(() => {
      result.current.onChange({
        target: { checked: true, name: 'smartphones' },
      } as any);
    });

    expect(result.current.checked).toBe(true);
  });

  test('The onChange should call the callback onQueryFilterChange by modifying only the filter concerned', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { result } = renderHook(
      () =>
        useFilterCheckbox({
          source: 'categories',
          name: 'smartphones',
        }),
      {
        wrapper,
        initialProps: {
          onQueryFilterChange: mockCallback,
          filters: {
            brand: 'apple',
            categories: ['laptops'],
          },
        },
      }
    );

    act(() => {
      result.current.onChange({
        target: { checked: true, name: 'smartphones' },
      } as any);
    });

    expect(result.current.checked).toBe(true);
    expect(mockCallback.mock.calls[0][0]).toEqual({
      brand: 'apple',
      categories: ['laptops', 'smartphones'],
    });

    act(() => {
      result.current.onChange({
        target: { checked: false, name: 'smartphones' },
      } as any);
    });

    expect(result.current.checked).toBe(false);
    expect(mockCallback.mock.calls[1][0]).toEqual({
      brand: 'apple',
      categories: ['laptops'],
    });
  });
});
