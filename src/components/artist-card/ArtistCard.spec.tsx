import { Artist } from "model/Artist";
import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import ArtistCard from "./ArtistCard";

let container: Element;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container.remove();
  container = null!;
});

it("should set ArtistCard data", async () => {
  const ARTIST_MOCK: Artist = {
    name: "Rosalia",
    external_urls: { spotify: "spotify-url" },
    images: [{ url: "image-url", height: 10, width: 10 }],
  } as Artist;

  ReactDOM.render(<ArtistCard artist={ARTIST_MOCK} />, container);
  expect(
    container!.querySelector(".artist-card")!.getAttribute("href")
  ).toEqual(ARTIST_MOCK.external_urls.spotify);
  expect(
    container!.querySelector(".artist-card__img")!.getAttribute("src")
  ).toEqual(ARTIST_MOCK.images[0].url);
  expect(container!.querySelector(".artist-card__title")!.innerHTML).toEqual(
    ARTIST_MOCK.name
  );
  expect(container!.querySelector(".artist-card__tag")!.innerHTML).toEqual(
    "Artist"
  );
});
