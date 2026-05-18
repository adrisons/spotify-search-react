import { configureStore } from "@reduxjs/toolkit";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import sessionReducer from "@application/store/session/sessionSlice";
import uiReducer from "@application/store/ui/uiSlice";
import type { SpotifySearchResponse } from "@infrastructure/spotify";
import { searchSpotify } from "@infrastructure/spotify";
import { DashboardPage } from "./DashboardPage";

vi.mock("@infrastructure/spotify", () => ({
  searchSpotify: vi.fn(),
}));

const searchSpotifyMock = vi.mocked(searchSpotify);

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });

  return { promise, resolve };
}

function searchResult(trackName: string): SpotifySearchResponse {
  return {
    albums: {
      href: "",
      items: [],
      limit: 20,
      next: "",
      offset: 0,
      previous: "",
      total: 0,
    },
    artists: {
      href: "",
      items: [],
      limit: 20,
      next: "",
      offset: 0,
      previous: "",
      total: 0,
    },
    tracks: {
      href: "",
      items: [
        {
          artists: [],
          explicit: false,
          duration_ms: 180000,
          album: { images: [] },
          external_urls: {
            spotify: `https://open.spotify.com/track/${trackName}`,
          },
          href: "",
          id: trackName,
          name: trackName,
          preview_url: "",
          type: "track",
          uri: `spotify:track:${trackName}`,
        },
      ],
      limit: 20,
      next: "",
      offset: 0,
      previous: "",
      total: 1,
    },
  };
}

function renderDashboard() {
  const store = configureStore({
    reducer: {
      session: sessionReducer,
      ui: uiReducer,
    },
    preloadedState: {
      session: {
        loggedIn: true,
        accessToken: "access-token",
        tokenExpiryDate: Date.now() + 60000,
      },
      ui: {
        searchTerms: [],
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </Provider>
  );
}

describe("DashboardPage", () => {
  beforeEach(() => {
    searchSpotifyMock.mockReset();
  });

  it("keeps the latest search results when responses resolve out of order", async () => {
    const firstSearch = deferred<SpotifySearchResponse | null>();
    const secondSearch = deferred<SpotifySearchResponse | null>();
    searchSpotifyMock
      .mockReturnValueOnce(firstSearch.promise)
      .mockReturnValueOnce(secondSearch.promise);

    renderDashboard();

    const searchInput = screen.getByRole("searchbox", {
      name: /search for album, artist or playlist/i,
    });
    const searchForm = screen.getByRole("search", {
      name: /search spotify/i,
    });

    fireEvent.change(searchInput, { target: { value: "old query" } });
    fireEvent.submit(searchForm);
    fireEvent.change(searchInput, { target: { value: "new query" } });
    fireEvent.submit(searchForm);

    expect(searchSpotifyMock).toHaveBeenNthCalledWith(
      1,
      "old query",
      "access-token"
    );
    expect(searchSpotifyMock).toHaveBeenNthCalledWith(
      2,
      "new query",
      "access-token"
    );

    await act(async () => {
      secondSearch.resolve(searchResult("New Track"));
      await secondSearch.promise;
    });

    expect(screen.getByText("New Track")).toBeInTheDocument();

    await act(async () => {
      firstSearch.resolve(searchResult("Old Track"));
      await firstSearch.promise;
    });

    expect(screen.getByText("New Track")).toBeInTheDocument();
    expect(screen.queryByText("Old Track")).not.toBeInTheDocument();
  });
});
