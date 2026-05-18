import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const MAX_SEARCH_TERMS = 4;

export interface UiState {
  searchTerms: string[];
}

const initialState: UiState = {
  searchTerms: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerms = [
        action.payload,
        ...state.searchTerms.slice(0, MAX_SEARCH_TERMS - 1),
      ];
    },
  },
  selectors: {
    selectRecentSearchTerms: (state) => state.searchTerms,
  },
});

export const { addSearchTerm } = uiSlice.actions;
export const { selectRecentSearchTerms } = uiSlice.selectors;
export default uiSlice.reducer;
