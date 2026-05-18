export class HttpClient {
  private baseHeaders: Record<string, string> = {};

  setAuthToken(token: string) {
    this.baseHeaders["Authorization"] = `Bearer ${token}`;
  }

  clearAuth() {
    delete this.baseHeaders["Authorization"];
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: this.baseHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

export const httpClient = new HttpClient();
