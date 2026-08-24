const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  // Laravel validation failures are surfaced here:
  validationErrors?: Record<string, string[]>;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  /**
   * Free-form label for where the form was submitted from.
   * Examples: "contact-page", "service:Architectural Design", "project:Villa X".
   * Used for SEO attribution and lead routing.
   */
  source?: string;
  locale?: string;
  /** Honeypot — real users leave it empty. */
  website?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Laravel validation responses: { message, errors: { field: [..] } }
        if (response.status === 422 && data?.errors) {
          return {
            error: data.message || 'Validation failed',
            validationErrors: data.errors,
          };
        }
        return {
          error: data.message || `Request failed (${response.status})`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  private async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // ---- Contact form ------------------------------------------------------

  /**
   * Submit a contact form. Used by the main /contact page, the per-service
   * pages, and the per-project pages.
   */
  async submitContact(payload: ContactSubmissionPayload): Promise<ApiResponse<{ id: number }>> {
    return this.post('/contact', payload);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Re-export the base URL so components doing direct fetch calls can use it
// (the rest of the codebase reads process.env.NEXT_PUBLIC_API_URL directly).
export { API_BASE_URL };
