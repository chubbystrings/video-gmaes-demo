import {
  OFF_LOADER,
  ON_LOADER,
  LOAD_DATA,
  FILTER,
  CLEAR_FILTER,
  EMPTY_SEARCH,
  OPEN_SEARCH_PROGRESS,
  CLOSE_SEARCH_PROGRESS,
  SCREEN_SIZE,
} from "./actionsTypes";

export const loadGames = () => ({
  type: LOAD_DATA,
});

export const offLoader = () => ({
  type: OFF_LOADER,
});

export const onLoader = () => ({
  type: ON_LOADER,
});

export const filter = ({
  name,
  score,
  sortBy,
  sortType,
}: {
  name: string;
  score: number;
  sortBy: string;
  sortType: string;
}) => ({
  type: FILTER,
  payload: {
    name,
    score,
    sortBy,
    sortType,
  },
});

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

export const emptySearch = () => ({
  type: EMPTY_SEARCH,
});

export const openSearchLoader = () => ({
  type: OPEN_SEARCH_PROGRESS,
});

export const closeSearchLoader = () => ({
  type: CLOSE_SEARCH_PROGRESS,
});
export const getScreenType = ({
  isMobile,
  isTablet,
  isLaptop,
}: {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
}) => ({
    type: SCREEN_SIZE,
    payload: {
        isMobile,
        isTablet,
        isLaptop
    }
});
