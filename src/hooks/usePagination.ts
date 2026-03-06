import { useCallback, useMemo, useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsOnCurrentPage: number;
  setPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const totalPages = useMemo(
    () => Math.max(Math.ceil(totalItems / itemsPerPage), 1),
    [totalItems, itemsPerPage],
  );

  const [currentPage, setCurrentPage] = useState(() => {
    return Math.min(Math.max(initialPage, 1), totalPages);
  });

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage],
  );
  const endIndex = useMemo(
    () => Math.min(startIndex + itemsPerPage - 1, totalItems - 1),
    [startIndex, itemsPerPage, totalItems],
  );

  const itemsOnCurrentPage = useMemo(
    () => endIndex - startIndex + 1,
    [startIndex, endIndex],
  );

  const setPage = useCallback(
    (pageNumber: number) => {
      const newPage = Math.min(Math.max(pageNumber, 1), totalPages);
      setCurrentPage(newPage);
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  const prevPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const canNextPage = currentPage < totalPages;
  const canPrevPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}
