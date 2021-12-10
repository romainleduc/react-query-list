import { useEffect, useReducer, useCallback, useRef } from 'react';

export interface PaginationHookResult {
  page: number;
  perPage: number;
  pagination: PaginationPayload;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  setPagination: (pagination: PaginationPayload) => void;
}

export interface PaginationPayload {
  page: number;
  perPage: number;
}

const paginationReducer = (
  prevState: PaginationPayload,
  nextState: Partial<PaginationPayload>
): PaginationPayload => {
  return {
    ...prevState,
    ...nextState,
  };
};

export const defaultPagination = {
  page: 1,
  perPage: 25,
};

/**
 * Hooks to provide pagination state (page and perPage)
 *
 * @example
 *
 * const { page, setPage, perPage, setPerPage } = usePagination(initialPerPage);
 *
 */
const useQueryPagination = (
  initialPagination: { perPage?: number; page?: number } = {}
): PaginationHookResult => {
  const [pagination, setPagination] = useReducer(paginationReducer, {
    ...defaultPagination,
    ...initialPagination,
  });
  const isFirstRender = useRef(true);

  const setPerPage = useCallback((perPage) => setPagination({ perPage }), []);
  const setPage = useCallback((page) => setPagination({ page }), []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPerPage(initialPagination.perPage || 25);
  }, [initialPagination.perPage, setPerPage]);

  return {
    page: pagination.page,
    perPage: pagination.perPage,
    pagination,
    setPage,
    setPerPage,
    setPagination,
  };
};

export default useQueryPagination;
