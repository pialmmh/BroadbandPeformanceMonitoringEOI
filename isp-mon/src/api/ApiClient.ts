import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiConfig } from '../config/api.config';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private useMockData: boolean = true; // Toggle for mock/real API

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ApiConfig.baseURL,
      timeout: ApiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...ApiConfig.headers
      }
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (this.useMockData) {
      const mockData = await this.getMockData(url);
      return mockData as T;
    }
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (this.useMockData) {
      const mockData = await this.postMockData(url, data);
      return mockData as T;
    }
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (this.useMockData) {
      const mockData = await this.putMockData(url, data);
      return mockData as T;
    }
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    if (this.useMockData) {
      const mockData = await this.patchMockData(url, data);
      return mockData as T;
    }
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    if (this.useMockData) {
      return {} as T;
    }
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  // Mock data handlers
  private async getMockData(url: string): Promise<any> {
    // Dynamically import mock data based on URL
    const { MockDataProvider } = await import('./MockDataProvider');
    return MockDataProvider.getInstance().getData(url);
  }

  private async postMockData(url: string, data: any): Promise<any> {
    const { MockDataProvider } = await import('./MockDataProvider');
    return MockDataProvider.getInstance().postData(url, data);
  }

  private async putMockData(url: string, data: any): Promise<any> {
    const { MockDataProvider } = await import('./MockDataProvider');
    return MockDataProvider.getInstance().putData(url, data);
  }

  private async patchMockData(url: string, data: any): Promise<any> {
    const { MockDataProvider } = await import('./MockDataProvider');
    return MockDataProvider.getInstance().patchData(url, data);
  }

  public setUseMockData(useMock: boolean): void {
    this.useMockData = useMock;
  }
}