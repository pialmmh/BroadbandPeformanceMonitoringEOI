export interface IAffectedRegion {
  name: string;
  coordinates: [number, number][];
}

export interface IAffectedInfrastructure {
  towers: string[];
  nttnNodes: string[];
}

export type DisasterType = 'flood' | 'earthquake' | 'storm' | 'fire' | 'other';
export type DisasterSeverity = 'low' | 'medium' | 'high' | 'critical';
export type DisasterStatus = 'predicted' | 'active' | 'contained' | 'resolved';

export class DisasterEvent {
  id: string;
  type: DisasterType;
  severity: DisasterSeverity;
  affectedRegion: IAffectedRegion;
  affectedInfrastructure: IAffectedInfrastructure;
  status: DisasterStatus;
  startTime: Date;
  endTime?: Date;
  responseTeams: string[];
  estimatedImpact?: string;
  actionsTaken?: string[];

  constructor(data: Partial<DisasterEvent>) {
    this.id = data.id || '';
    this.type = data.type || 'other';
    this.severity = data.severity || 'low';
    this.affectedRegion = data.affectedRegion || { name: '', coordinates: [] };
    this.affectedInfrastructure = data.affectedInfrastructure || { towers: [], nttnNodes: [] };
    this.status = data.status || 'predicted';
    this.startTime = data.startTime ? new Date(data.startTime) : new Date();
    this.endTime = data.endTime ? new Date(data.endTime) : undefined;
    this.responseTeams = data.responseTeams || [];
    this.estimatedImpact = data.estimatedImpact;
    this.actionsTaken = data.actionsTaken || [];
  }

  static fromJSON(json: any): DisasterEvent {
    return new DisasterEvent({
      ...json,
      startTime: new Date(json.startTime),
      endTime: json.endTime ? new Date(json.endTime) : undefined
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      severity: this.severity,
      affectedRegion: this.affectedRegion,
      affectedInfrastructure: this.affectedInfrastructure,
      status: this.status,
      startTime: this.startTime.toISOString(),
      endTime: this.endTime?.toISOString(),
      responseTeams: this.responseTeams,
      estimatedImpact: this.estimatedImpact,
      actionsTaken: this.actionsTaken
    };
  }

  getDuration(): number {
    const end = this.endTime || new Date();
    return end.getTime() - this.startTime.getTime();
  }

  getTotalAffectedInfrastructure(): number {
    return this.affectedInfrastructure.towers.length + 
           this.affectedInfrastructure.nttnNodes.length;
  }
}