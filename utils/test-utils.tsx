import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { QueryListProvider } from '../src/components/QueryListProvider';

const queryListProviderWrapper = (
  {
    children,
    data,
    onQueryFilterChange,
    error,
    response,
    loading,
    refetch,
    filters,
    enableReinitialize
  }: any) => (
  <QueryListProvider
    onQueryFilterChange={onQueryFilterChange}
    data={data}
    error={error}
    response={response}
    loading={loading}
    refetch={refetch}
    filters={filters}
    enableReinitialize={enableReinitialize}
  >
    {children}
  </QueryListProvider>
);

export { queryListProviderWrapper };