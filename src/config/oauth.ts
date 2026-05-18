const SCOPES = ["user-read-private"];

export function getClientId(): string {
  return import.meta.env.VITE_SPOTIFY_CLIENT_ID;
}

export function getRedirectUri(): string {
  return import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
}

export function buildAuthorizeUrl(codeChallenge: string): string {
  const params = new URLSearchParams({
    client_id: getClientId(),
    response_type: "code",
    redirect_uri: getRedirectUri(),
    scope: SCOPES.join(" "),
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}
