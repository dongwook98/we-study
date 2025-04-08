const BASE_URL = import.meta.env.PROD
  ? import.meta.env.BASE_URL
  : 'http://localhost:8080/api';

// Custom API error class
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Process API response
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorData;
    try {
      // 백엔드에서 받은 예외 메시지 읽기
      errorData = await response.json();
    } catch {
      // 예상치못한 에러 처리
      errorData = { message: 'Unknown error occurred' };
    }

    throw new ApiError(
      response.status,
      errorData.message || `API Error: ${response.status}`
    );
  }

  return response.json();
};

const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    return handleResponse<T>(response);
  },

  post: async <T, D = unknown>(endpoint: string, body: D): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  put: async <T, D = unknown>(endpoint: string, body: D): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<T>(response);
  },
};

export default apiClient;
