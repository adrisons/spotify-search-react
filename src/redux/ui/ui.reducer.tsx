import { UiActionTypes } from "./ui.types";
import { UiStateType } from "./ui.state";
const INITIAL_STATE: UiStateType = {
  searchTerms: [],
};
const MAX_SEARCH_TERMS = 4;
const uiReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UiActionTypes.ADD_SEARCH_TERM:
      return {
        ...state,
        searchTerms: [
          action.payload,
          ...state.searchTerms.slice(0, MAX_SEARCH_TERMS - 1),
        ],
      };
    default:
      return state;
  }
};

export default uiReducer;
