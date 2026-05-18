const SCOPES = ["user-read-private"];

export function getAuthorizeHref(): string {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const authEndpoint = import.meta.env.VITE_SPOTIFY_AUTHORIZE_URL;

  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${SCOPES.join("%20")}&response_type=token`;
}
