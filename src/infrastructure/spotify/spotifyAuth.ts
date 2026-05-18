import { getStoredCodeVerifier, clearCodeVerifier } from "./pkce";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export function getQueryParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function cleanUrlParams(): void {
  window.history.replaceState({}, document.title, window.location.pathname);
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export async function exchangeCodeForToken(
  code: string,
  clientId: string,
  redirectUri: string
): Promise<TokenResponse | null> {
  const codeVerifier = getStoredCodeVerifier();
  if (!codeVerifier) {
    console.error("No code verifier found in session storage");
    return null;
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Token exchange failed:", error);
      return null;
    }

    clearCodeVerifier();
    return (await response.json()) as TokenResponse;
  } catch (error) {
    console.error("Token exchange error:", error);
    return null;
  }
}
