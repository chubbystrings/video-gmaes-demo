import { reactive, readonly, toRefs } from "vue";
import instance from "../services/axios";
export interface GAMES {
  first_release_date: Date;
  id: number;
  name: string;
  rating: number;
  summary: string;
}
interface SCREEN {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean
}

interface INITIAL_STATE {
  counter: number;
  games: GAMES[];
  loader: boolean;
  searchedGames: GAMES[];
  searchIsEmpty: boolean;
  isSearching: boolean;
  screen: SCREEN
}
interface ACTION {
  type: string;
  payload?: any;
}

const initialState: INITIAL_STATE = reactive({
  counter: 0,
  games: [],
  loader: false,
  searchedGames: [],
  searchIsEmpty: false,
  isSearching: false,
  screen: {
    isLaptop: false,
    isMobile: false,
    isTablet: false,
  }
});

export const useContext = () => {

  const handleOnLoader = () => {
    initialState.loader = true;
  };

  const handleOffLoader = () => {
    initialState.loader = false;
  };

  const handleLoadGames = async () => {
    try {
      handleOnLoader();
      const res = await instance.get("/");
      initialState.games = res.data;
      handleOffLoader();
    } catch (error) {
      handleOffLoader();
    }
  };

  const handleSort = (sortBy: string, order: string = "date") => {
    if (sortBy === "date") {
      initialState.searchedGames =
        order === "asc"
          ? initialState.searchedGames.sort(
              (a, b) =>
                new Date(a.first_release_date).valueOf() -
                new Date(b.first_release_date).valueOf()
            )
          : initialState.searchedGames.sort(
              (a, b) =>
                new Date(b.first_release_date).valueOf() -
                new Date(a.first_release_date).valueOf()
            );
    }
    if (sortBy === "name") {
      initialState.searchedGames =
        order === "asc"
          ? initialState.searchedGames.sort((a, b) =>
              a.name < b.name ? -1 : 1
            )
          : initialState.searchedGames.sort((a, b) =>
              a.name > b.name ? -1 : 1
            );
    }

    if (sortBy === "score") {
      initialState.searchedGames =
        order === "asc"
          ? initialState.searchedGames.sort((a, b) => a.rating - b.rating)
          : initialState.searchedGames.sort((a, b) => b.rating - a.rating);
    }
  };

  const handleSearch = ({
    name,
    score,
    sortBy,
    sortType,
  }: {
    name: string;
    score: number;
    sortBy: string;
    sortType: string;
  }) => {
    if (name || score) {
      const nameRegex = new RegExp(name, "gi");
      initialState.searchedGames = initialState.games.filter(
        (game) => game.name.match(nameRegex) && game.rating >= Number(score)
      );
      if (initialState.searchedGames.length === 0) {
        initialState.searchIsEmpty = true;
      } else {
        initialState.searchIsEmpty = false;
      }
      if (sortBy) {
        handleSort(sortBy, sortType);
      }
    } else {
      initialState.searchedGames = [];
      initialState.searchIsEmpty = true;
    }
    handleCloseSearchProgress();
  };

  const handleClearFilter = () => {
    initialState.searchedGames = [];
  };

  const handleOpenSearchProgress = () => {
    initialState.isSearching = true;
  };
  const handleCloseSearchProgress = () => {
    initialState.isSearching = false;
  };

  const handleScreenSize = ({
    isMobile,
    isTablet,
    isLaptop,
  }: {
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
  }) => {
    initialState.screen = {
      isMobile,
      isTablet,
      isLaptop
    }
  };

  const dispatch = (action: ACTION) => {
    switch (action.type) {
      case "LOAD_DATA":
        handleLoadGames();
        return;
      case "ON_LOADER":
        handleOnLoader();
        return;
      case "OFF_LOADER":
        handleOffLoader();
        return;
      case "FILTER":
        handleSearch(action.payload);
        return;
      case "CLEAR_FILTER":
        handleClearFilter();
        return;
      case "OPEN_SEARCH_PROGRESS":
        handleOpenSearchProgress();
        return;
      case "CLOSE_SEARCH_PROGRESS":
        handleCloseSearchProgress();
        return;
      case "SCREEN_SIZE": 
        handleScreenSize(action.payload);
        return
      default:
        throw Error("Action not recognized");
    }
  };

  return { state: readonly(toRefs(initialState)), dispatch };
};
