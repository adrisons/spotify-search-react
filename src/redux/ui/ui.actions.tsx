import { UiActionTypes } from "./ui.types";

export const addSearchTerm = (term: string) => ({
  type: UiActionTypes.ADD_SEARCH_TERM,
  payload: term,
});
