const VERIFIER_KEY = "spotify_pkce_verifier";

function generateRandomString(length: number): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = "";
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generateCodeChallenge(): Promise<string> {
  const verifier = generateRandomString(64);
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
}

export function getStoredCodeVerifier(): string | null {
  return sessionStorage.getItem(VERIFIER_KEY);
}

export function clearCodeVerifier(): void {
  sessionStorage.removeItem(VERIFIER_KEY);
}
