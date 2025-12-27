import { Alert } from '../models/Alert.model';
import { IRepositoryWithPagination, IPaginatedResult, IQueryOptions } from './interfaces/IRepository';
import { ApiClient } from '../api/ApiClient';

export interface IAlertRepository extends IRepositoryWithPagination<Alert> {
  findBySeverity(severity: string): Promise<Alert[]>;
  findBySource(source: string): Promise<Alert[]>;
  findUnacknowledged(): Promise<Alert[]>;
  acknowledge(id: string): Promise<Alert | null>;
  acknowledgeMultiple(ids: string[]): Promise<boolean>;
}

export class AlertRepository implements IAlertRepository {
  private apiClient: ApiClient;
  private endpoint = '/api/alerts';

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  async findAll(): Promise<Alert[]> {
    const response = await this.apiClient.get<any[]>(this.endpoint);
    return response.map(data => Alert.fromJSON(data));
  }

  async findAllPaginated(options: IQueryOptions): Promise<IPaginatedResult<Alert>> {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page.toString());
    if (options.pageSize) params.append('pageSize', options.pageSize.toString());
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    
    const response = await this.apiClient.get<any>(`${this.endpoint}?${params.toString()}`);
    return {
      data: response.data.map((d: any) => Alert.fromJSON(d)),
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
      totalPages: response.totalPages
    };
  }

  async findById(id: string): Promise<Alert | null> {
    try {
      const response = await this.apiClient.get<any>(`${this.endpoint}/${id}`);
      return Alert.fromJSON(response);
    } catch (error) {
      return null;
    }
  }

  async findBySeverity(severity: string): Promise<Alert[]> {
    const response = await this.apiClient.get<any[]>(`${this.endpoint}/severity/${severity}`);
    return response.map(data => Alert.fromJSON(data));
  }

  async findBySource(source: string): Promise<Alert[]> {
    const response = await this.apiClient.get<any[]>(`${this.endpoint}/source/${source}`);
    return response.map(data => Alert.fromJSON(data));
  }

  async findUnacknowledged(): Promise<Alert[]> {
    const response = await this.apiClient.get<any[]>(`${this.endpoint}/unacknowledged`);
    return response.map(data => Alert.fromJSON(data));
  }

  async create(alert: Alert): Promise<Alert> {
    const response = await this.apiClient.post<any>(this.endpoint, alert.toJSON());
    return Alert.fromJSON(response);
  }

  async update(id: string, alert: Partial<Alert>): Promise<Alert | null> {
    try {
      const response = await this.apiClient.put<any>(`${this.endpoint}/${id}`, alert);
      return Alert.fromJSON(response);
    } catch (error) {
      return null;
    }
  }

  async acknowledge(id: string): Promise<Alert | null> {
    try {
      const response = await this.apiClient.patch<any>(`${this.endpoint}/${id}/acknowledge`, {
        acknowledged: true,
        acknowledgedAt: new Date().toISOString()
      });
      return Alert.fromJSON(response);
    } catch (error) {
      return null;
    }
  }

  async acknowledgeMultiple(ids: string[]): Promise<boolean> {
    try {
      await this.apiClient.post(`${this.endpoint}/acknowledge-multiple`, { ids });
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}