import { generateMockTowers, generateMockNTTNNodes, generateMockAlerts, 
         generateMockDisasterEvents, generateMockResponseTeams, 
         generateMockIntegrationPoints, generateMockSystemMetrics } from './mockData';

export class MockDataProvider {
  private static instance: MockDataProvider;
  private data: Map<string, any[]> = new Map();
  
  private constructor() {
    this.initializeMockData();
  }

  public static getInstance(): MockDataProvider {
    if (!MockDataProvider.instance) {
      MockDataProvider.instance = new MockDataProvider();
    }
    return MockDataProvider.instance;
  }

  private initializeMockData(): void {
    this.data.set('towers', generateMockTowers());
    this.data.set('nttn-nodes', generateMockNTTNNodes());
    this.data.set('alerts', generateMockAlerts());
    this.data.set('disasters', generateMockDisasterEvents());
    this.data.set('response-teams', generateMockResponseTeams());
    this.data.set('integrations', generateMockIntegrationPoints());
    this.data.set('metrics', [generateMockSystemMetrics()]);
  }

  public async getData(url: string): Promise<any> {
    // Simulate network delay
    await this.simulateDelay();

    // Parse the URL to determine what data to return
    const path = url.replace(/^\/api\//, '');
    const segments = path.split('/');
    const resource = segments[0];
    
    // Handle different URL patterns
    if (segments.length === 1) {
      // Get all items
      const items = this.data.get(resource) || [];
      
      // Check for query parameters
      if (url.includes('?')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const page = parseInt(params.get('page') || '1');
        const pageSize = parseInt(params.get('pageSize') || '10');
        
        // Return paginated data
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = items.slice(start, end);
        
        return {
          data: paginatedData,
          total: items.length,
          page,
          pageSize,
          totalPages: Math.ceil(items.length / pageSize)
        };
      }
      
      return items;
    } else if (segments.length === 2) {
      // Get single item by ID
      const id = segments[1];
      const items = this.data.get(resource) || [];
      return items.find((item: any) => item.id === id) || null;
    } else if (segments.length === 3) {
      // Handle special endpoints like /towers/status/{status}
      const items = this.data.get(resource) || [];
      const filterType = segments[1];
      const filterValue = segments[2];
      
      if (filterType === 'status') {
        return items.filter((item: any) => item.status === filterValue);
      }
    }
    
    // Handle location-based queries
    if (url.includes('/location?')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const lat = parseFloat(params.get('lat') || '0');
      const lng = parseFloat(params.get('lng') || '0');
      const radius = parseFloat(params.get('radius') || '10');
      
      const items = this.data.get(resource) || [];
      // Simple distance filter (in real app, use proper geo calculations)
      return items.filter((item: any) => {
        if (item.location) {
          const distance = Math.sqrt(
            Math.pow(item.location.lat - lat, 2) + 
            Math.pow(item.location.lng - lng, 2)
          );
          return distance <= radius;
        }
        return false;
      });
    }
    
    return [];
  }

  public async postData(url: string, data: any): Promise<any> {
    await this.simulateDelay();
    
    const resource = url.replace(/^\/api\//, '').split('/')[0];
    const items = this.data.get(resource) || [];
    
    // Generate new ID
    const newItem = {
      ...data,
      id: `${resource}-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    items.push(newItem);
    this.data.set(resource, items);
    
    return newItem;
  }

  public async putData(url: string, data: any): Promise<any> {
    await this.simulateDelay();
    
    const segments = url.replace(/^\/api\//, '').split('/');
    const resource = segments[0];
    const id = segments[1];
    
    const items = this.data.get(resource) || [];
    const index = items.findIndex((item: any) => item.id === id);
    
    if (index !== -1) {
      items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
      this.data.set(resource, items);
      return items[index];
    }
    
    throw new Error('Item not found');
  }

  public async patchData(url: string, data: any): Promise<any> {
    await this.simulateDelay();
    
    const segments = url.replace(/^\/api\//, '').split('/');
    const resource = segments[0];
    const id = segments[1];
    const subResource = segments[2];
    
    const items = this.data.get(resource) || [];
    const index = items.findIndex((item: any) => item.id === id);
    
    if (index !== -1) {
      if (subResource) {
        // Update sub-resource (e.g., /towers/{id}/health)
        items[index][subResource] = { ...items[index][subResource], ...data };
      } else {
        // Partial update
        items[index] = { ...items[index], ...data };
      }
      items[index].updatedAt = new Date().toISOString();
      this.data.set(resource, items);
      return items[index];
    }
    
    throw new Error('Item not found');
  }

  private async simulateDelay(): Promise<void> {
    // Simulate network latency (50-200ms)
    const delay = Math.random() * 150 + 50;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Utility method to refresh mock data
  public refreshData(): void {
    this.initializeMockData();
  }

  // Get raw data for debugging
  public getRawData(resource: string): any[] {
    return this.data.get(resource) || [];
  }
}