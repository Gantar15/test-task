import axios from "axios";

class ApiService {
  async get<R>(
    apiUrl: string,
    params?: Record<string, string | number>
  ): Promise<R> {
    const response = await axios.get(apiUrl, {
      params: params
    });

    return response.data;
  }

  async post<R>(apiUrl: string, data?: unknown): Promise<R> {
    const response = await axios.post(apiUrl, data);

    return response.data;
  }

  async put<R>(apiUrl: string, data?: unknown): Promise<R> {
    const response = await axios.put(apiUrl, data);

    return response.data;
  }

  async delete<R>(apiUrl: string): Promise<R> {
    const response = await axios.delete(apiUrl, {});

    return response.data;
  }
}

const apiService = new ApiService();
export { apiService };
