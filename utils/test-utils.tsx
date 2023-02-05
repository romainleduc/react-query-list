import React from 'react';
import { QueryListProvider } from '../src/components/QueryListProvider';
import '@testing-library/jest-dom/extend-expect';

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
    enableReinitialize,
    disableTruthy
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
    disableTruthy={disableTruthy}
  >
    {children}
  </QueryListProvider>
);

export { queryListProviderWrapper };