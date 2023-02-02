import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import useFilterInput from '../useFilterInput';
import { queryListProviderWrapper as wrapper } from 'test-utils';

test('The default value should be empty string', () => {
  const { result } = renderHook(() => useFilterInput(
    {
      source: 'color',
    }
  ), {
    wrapper,
  });
  
  expect(result.current.value).toBe("");
});

test('The default value should be editable', () => {
  const { result } = renderHook(() => useFilterInput(
    {
      defaultValue: 'black',
      source: 'color',
    }
  ), {
    wrapper,
  });
  
  expect(result.current.value).toBe("black");
});

test('The default value should not override the provider one', () => {
  const { result } = renderHook(() => useFilterInput(
    {
      defaultValue: 'black',
      source: 'color',
    }
  ), {
    wrapper,
    initialProps: {
      filters: {
        color: 'red',
      }
    }
  });

  expect(result.current.value).toBe("red");
});

