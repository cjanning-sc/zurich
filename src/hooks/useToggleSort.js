import { useState, useCallback } from "react";
import { useToggleState } from './useToggleState';
import { SORT_ASC, SORT_DESC } from '../api/search';

export const useToggleSort = (initialKey, initialDirection) => {
    const [sortKey, setSortKey] = useState(initialKey);
    const [
      sortDirection,
      toggleSortDirection,
      setSortDirection
    ] = useToggleState(initialDirection, [
        SORT_DESC,
        SORT_ASC
    ]);
  
    const setSort = useCallback(
      key => {
        if (key !== sortKey) {
          setSortKey(key);
          setSortDirection(initialDirection);
        } else {
          toggleSortDirection();
        }
      },
      [sortKey, setSortKey, toggleSortDirection, setSortDirection]
    );

    return { key: sortKey, direction: sortDirection, set: setSort };
  }