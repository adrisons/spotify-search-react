import { createSelector } from "reselect";

import { UiStateType } from "./ui.state";

const selectUi = (state: { ui: UiStateType }) => state.ui;
export const selectRecentSearchTerms = createSelector(
  [selectUi],
  (ui) => ui.searchTerms
);
