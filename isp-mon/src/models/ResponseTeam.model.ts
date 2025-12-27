export interface ILocation {
  lat: number;
  lng: number;
}

export interface IResources {
  personnel: number;
  vehicles: number;
  equipment: string[];
}

export type TeamStatus = 'available' | 'deployed' | 'en-route';
export type TeamSpecialization = 'technical' | 'medical' | 'rescue' | 'logistics' | 'general';

export class ResponseTeam {
  id: string;
  name: string;
  status: TeamStatus;
  location?: ILocation;
  assignedDisaster?: string;
  resources: IResources;
  specialization: TeamSpecialization;
  contactNumber: string;
  responseTime?: number; // in minutes
  lastDeployment?: Date;

  constructor(data: Partial<ResponseTeam>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.status = data.status || 'available';
    this.location = data.location;
    this.assignedDisaster = data.assignedDisaster;
    this.resources = data.resources || { personnel: 0, vehicles: 0, equipment: [] };
    this.specialization = data.specialization || 'general';
    this.contactNumber = data.contactNumber || '';
    this.responseTime = data.responseTime;
    this.lastDeployment = data.lastDeployment ? new Date(data.lastDeployment) : undefined;
  }

  static fromJSON(json: any): ResponseTeam {
    return new ResponseTeam({
      ...json,
      lastDeployment: json.lastDeployment ? new Date(json.lastDeployment) : undefined
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      location: this.location,
      assignedDisaster: this.assignedDisaster,
      resources: this.resources,
      specialization: this.specialization,
      contactNumber: this.contactNumber,
      responseTime: this.responseTime,
      lastDeployment: this.lastDeployment?.toISOString()
    };
  }

  getTotalResources(): number {
    return this.resources.personnel + this.resources.vehicles;
  }

  isAvailable(): boolean {
    return this.status === 'available';
  }

  deploy(disasterId: string, location?: ILocation): void {
    this.status = 'en-route';
    this.assignedDisaster = disasterId;
    if (location) {
      this.location = location;
    }
    this.lastDeployment = new Date();
  }
}