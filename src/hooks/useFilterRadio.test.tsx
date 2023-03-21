import { renderHook, act } from '@testing-library/react-hooks';
import { queryListProviderWrapper as wrapper } from 'test-utils';
import useFilterRadio from './useFilterRadio';

describe('useFilterRadio', () => {
  test('Should return type "radio"', () => {
    const { result } = renderHook(
      () =>
        useFilterRadio({
          value: 'smartphones',
          source: 'category',
        }),
      {
        wrapper,
      }
    );

    expect(result.current.type).toBe('radio');
  });

  test('The checked value should be "false" if the value does not exist in the context', () => {
    const { result } = renderHook(
      () =>
        useFilterRadio({
          value: 'smartphones',
          source: 'category',
        }),
      {
        wrapper,
      }
    );

    expect(result.current.value).toBe('smartphones');
    expect(result.current.checked).toBe(false);
  });

  test('The checked value should be "true" if the value exists in the context', () => {
    const { result } = renderHook(
      () =>
        useFilterRadio({
          value: 'smartphones',
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
    expect(result.current.checked).toBe(true);
  });

  test('The checked value should update with the context', () => {
    const mockCallback = jest.fn((filters, setFilters) => setFilters(filters));
    const { result } = renderHook(
      () =>
        useFilterRadio({
          value: 'smartphones',
          source: 'category',
        }),
      {
        wrapper,
        initialProps: {
          onQueryFilterChange: mockCallback,
        },
      }
    );

    act(() => {
      result.current.onChange({ target: { value: 'smartphones' } } as any);
    });

    expect(result.current.value).toBe('smartphones');
    expect(result.current.checked).toBe(true);
  });

  test('The onChange should call the callback onQueryFilterChange by modifying only the filter concerned', () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(
      () =>
        useFilterRadio({
          value: 'smartphones',
          source: 'category',
        }),
      {
        wrapper,
        initialProps: {
          onQueryFilterChange: mockCallback,
          filters: {
            category: 'laptop',
            brand: 'apple',
          },
        },
      }
    );

    act(() => {
      result.current.onChange({ target: { value: 'smartphones' } } as any);
    });

    expect(mockCallback.mock.calls[0][0]).toEqual({
      brand: 'apple',
      category: 'smartphones',
    });
  });
});
