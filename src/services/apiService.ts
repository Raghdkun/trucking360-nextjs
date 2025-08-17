import { API_CONFIG, HTTP_METHODS, ApiResponse, ApiError } from '@/config/constants';

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.HEADERS;
  }

  /**
   * Generic method to make HTTP requests
   */
  private async makeRequest<T>(
    endpoint: string,
    method: string = HTTP_METHODS.GET,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...customHeaders };

      const config: RequestInit = {
        method,
        headers,
      };

      // Add body for POST, PUT, PATCH requests
      if (data && [HTTP_METHODS.POST, HTTP_METHODS.PUT, HTTP_METHODS.PATCH].includes(method as any)) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      return {
        success: true,
        data: responseData,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      console.error('API Request Error:', error);
      throw {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500,
        code: 'API_ERROR',
      } as ApiError;
    }
  }

  /**
   * GET request method
   */
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, HTTP_METHODS.GET, undefined, headers);
  }

  /**
   * POST request method
   */
  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, HTTP_METHODS.POST, data, headers);
  }

  /**
   * PUT request method
   */
  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, HTTP_METHODS.PUT, data, headers);
  }

  /**
   * DELETE request method
   */
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, HTTP_METHODS.DELETE, undefined, headers);
  }

  /**
   * PATCH request method
   */
  async patch<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, HTTP_METHODS.PATCH, data, headers);
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;