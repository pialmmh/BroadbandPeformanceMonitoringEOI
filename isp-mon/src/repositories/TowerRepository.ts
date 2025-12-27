import { Tower } from '../models/Tower.model';
import { IRepositoryWithPagination, IPaginatedResult, IQueryOptions } from './interfaces/IRepository';
import { ApiClient } from '../api/ApiClient';

export interface ITowerRepository extends IRepositoryWithPagination<Tower> {
  findByStatus(status: string): Promise<Tower[]>;
  findByLocation(lat: number, lng: number, radius: number): Promise<Tower[]>;
  updateHealth(id: string, health: any): Promise<Tower | null>;
}

export class TowerRepository implements ITowerRepository {
  private apiClient: ApiClient;
  private endpoint = '/api/towers';

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  async findAll(): Promise<Tower[]> {
    const response = await this.apiClient.get<any[]>(this.endpoint);
    return response.map(data => Tower.fromJSON(data));
  }

  async findAllPaginated(options: IQueryOptions): Promise<IPaginatedResult<Tower>> {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page.toString());
    if (options.pageSize) params.append('pageSize', options.pageSize.toString());
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    
    const response = await this.apiClient.get<any>(`${this.endpoint}?${params.toString()}`);
    return {
      data: response.data.map((d: any) => Tower.fromJSON(d)),
      total: response.total,
      page: response.page,
      pageSize: response.pageSize,
      totalPages: response.totalPages
    };
  }

  async findById(id: string): Promise<Tower | null> {
    try {
      const response = await this.apiClient.get<any>(`${this.endpoint}/${id}`);
      return Tower.fromJSON(response);
    } catch (error) {
      return null;
    }
  }

  async findByStatus(status: string): Promise<Tower[]> {
    const response = await this.apiClient.get<any[]>(`${this.endpoint}/status/${status}`);
    return response.map(data => Tower.fromJSON(data));
  }

  async findByLocation(lat: number, lng: number, radius: number): Promise<Tower[]> {
    const response = await this.apiClient.get<any[]>(
      `${this.endpoint}/location?lat=${lat}&lng=${lng}&radius=${radius}`
    );
    return response.map(data => Tower.fromJSON(data));
  }

  async create(tower: Tower): Promise<Tower> {
    const response = await this.apiClient.post<any>(this.endpoint, tower.toJSON());
    return Tower.fromJSON(response);
  }

  async update(id: string, tower: Partial<Tower>): Promise<Tower | null> {
    try {
      const response = await this.apiClient.put<any>(`${this.endpoint}/${id}`, tower);
      return Tower.fromJSON(response);
    } catch (error) {
      return null;
    }
  }

  async updateHealth(id: string, health: any): Promise<Tower | null> {
    try {
      const response = await this.apiClient.patch<any>(`${this.endpoint}/${id}/health`, health);
      return Tower.fromJSON(response);
    } catch (error) {
      return null;
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