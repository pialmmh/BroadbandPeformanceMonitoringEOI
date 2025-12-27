import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useRegionFilter } from './RegionFilterContext';
import { bangladeshDivisions } from '../data/bangladeshRegions';
import {
  Tower,
  NTTNNode,
  Alert,
  DisasterEvent,
  ResponseTeam,
  IntegrationPoint,
  SystemMetrics
} from '../types';
import {
  generateDummyTowers,
  generateDummyNTTNNodes,
  generateAlerts,
  generateDummyDisasterEvents,
  generateDummyResponseTeams,
  generateDummyIntegrationPoints,
  generateSystemMetrics
} from '../utils/dummyData';

interface DataContextType {
  towers: Tower[];
  nttnNodes: NTTNNode[];
  alerts: Alert[];
  disasterEvents: DisasterEvent[];
  responseTeams: ResponseTeam[];
  integrationPoints: IntegrationPoint[];
  systemMetrics: SystemMetrics;
  filteredTowers: Tower[];
  filteredNttnNodes: NTTNNode[];
  filteredAlerts: Alert[];
  filteredDisasterEvents: DisasterEvent[];
  filteredResponseTeams: ResponseTeam[];
  filteredIntegrationPoints: IntegrationPoint[];
  filteredSystemMetrics: SystemMetrics;
  acknowledgeAlert: (alertId: string) => void;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { selectedRegions, isAllSelected } = useRegionFilter();
  
  const [towers, setTowers] = useState<Tower[]>([]);
  const [nttnNodes, setNttnNodes] = useState<NTTNNode[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [disasterEvents, setDisasterEvents] = useState<DisasterEvent[]>([]);
  const [responseTeams, setResponseTeams] = useState<ResponseTeam[]>([]);
  const [integrationPoints, setIntegrationPoints] = useState<IntegrationPoint[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalTowers: 0,
    operationalTowers: 0,
    totalNTTNNodes: 0,
    operationalNTTNNodes: 0,
    activeAlerts: 0,
    criticalAlerts: 0,
    averageUptime: 0,
    networkLoad: 0,
    disasterRisk: 'low'
  });

  const loadData = () => {
    const towersData = generateDummyTowers();
    const nodesData = generateDummyNTTNNodes();
    const allAlerts: Alert[] = [];
    
    towersData.forEach(tower => {
      allAlerts.push(...tower.alerts);
    });
    
    allAlerts.push(...generateAlerts(5, 'System'));
    
    setTowers(towersData);
    setNttnNodes(nodesData);
    setAlerts(allAlerts);
    setDisasterEvents(generateDummyDisasterEvents());
    setResponseTeams(generateDummyResponseTeams());
    setIntegrationPoints(generateDummyIntegrationPoints());
    setSystemMetrics(generateSystemMetrics(towersData, nodesData, allAlerts));
  };

  useEffect(() => {
    loadData();
    
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const refreshData = () => {
    loadData();
  };

  // Helper function to check if a location matches selected regions
  const isLocationInSelectedRegions = (location: string): boolean => {
    if (isAllSelected()) return true;
    
    // Parse location string (format: "District, Division" or just "Division")
    const parts = location.split(',').map(s => s.trim());
    let divisionName = '';
    let districtName = '';
    
    if (parts.length === 2) {
      districtName = parts[0];
      divisionName = parts[1];
    } else if (parts.length === 1) {
      divisionName = parts[0];
    }
    
    // Find the division and district
    const division = bangladeshDivisions.find(d => 
      d.name.toLowerCase() === divisionName.toLowerCase()
    );
    
    if (!division) return false;
    
    if (districtName) {
      const district = division.districts.find(d => 
        d.name.toLowerCase() === districtName.toLowerCase()
      );
      if (district) {
        return selectedRegions.has(district.id);
      }
    }
    
    // Check if any district in the division is selected
    return division.districts.some(d => selectedRegions.has(d.id));
  };

  // Filter data based on selected regions
  const filteredTowers = useMemo(() => {
    if (isAllSelected()) return towers;
    return towers.filter(tower => isLocationInSelectedRegions(tower.location.address));
  }, [towers, selectedRegions, isAllSelected]);

  const filteredNttnNodes = useMemo(() => {
    if (isAllSelected()) return nttnNodes;
    // NTTNNodes don't have location in the current type definition, return all for now
    return nttnNodes;
  }, [nttnNodes, selectedRegions, isAllSelected]);

  const filteredAlerts = useMemo(() => {
    if (isAllSelected()) return alerts;
    return alerts.filter(alert => {
      // Include system-wide alerts without location
      if (!alert.source || alert.source === 'System') return true;
      // Check if alert's source tower is in selected regions
      const tower = towers.find(t => t.id === alert.source);
      if (tower) {
        return isLocationInSelectedRegions(tower.location.address);
      }
      return true;
    });
  }, [alerts, towers, selectedRegions, isAllSelected]);

  const filteredDisasterEvents = useMemo(() => {
    if (isAllSelected()) return disasterEvents;
    // Filter by affected region name
    return disasterEvents.filter(event => {
      if (event.affectedRegion && event.affectedRegion.name) {
        return isLocationInSelectedRegions(event.affectedRegion.name);
      }
      return true;
    });
  }, [disasterEvents, selectedRegions, isAllSelected]);

  const filteredResponseTeams = useMemo(() => {
    if (isAllSelected()) return responseTeams;
    return responseTeams.filter(team => {
      if (team.location) {
        // Convert location object to string for filtering
        const locationStr = `${team.location.lat}, ${team.location.lng}`;
        return true; // For now, include all teams with locations
      }
      return true;
    });
  }, [responseTeams, selectedRegions, isAllSelected]);

  const filteredIntegrationPoints = useMemo(() => {
    // Integration points are not location-specific
    return integrationPoints;
  }, [integrationPoints]);

  // Calculate metrics based on filtered data
  const filteredSystemMetrics = useMemo((): SystemMetrics => {
    const operationalTowers = filteredTowers.filter(t => t.status === 'operational').length;
    const operationalNodes = filteredNttnNodes.filter(n => n.status === 'operational').length;
    const activeAlerts = filteredAlerts.filter(a => !a.acknowledged).length;
    const criticalAlerts = filteredAlerts.filter(a => a.severity === 'critical' && !a.acknowledged).length;
    
    return {
      totalTowers: filteredTowers.length,
      operationalTowers,
      totalNTTNNodes: filteredNttnNodes.length,
      operationalNTTNNodes: operationalNodes,
      activeAlerts,
      criticalAlerts,
      averageUptime: filteredTowers.length > 0 ? (operationalTowers / filteredTowers.length) * 100 : 0,
      networkLoad: filteredNttnNodes.reduce((acc, n) => acc + (n.load || 0), 0) / (filteredNttnNodes.length || 1),
      disasterRisk: criticalAlerts > 5 ? 'high' : criticalAlerts > 2 ? 'medium' : 'low'
    };
  }, [filteredTowers, filteredNttnNodes, filteredAlerts]);

  return (
    <DataContext.Provider value={{
      towers,
      nttnNodes,
      alerts,
      disasterEvents,
      responseTeams,
      integrationPoints,
      systemMetrics,
      filteredTowers,
      filteredNttnNodes,
      filteredAlerts,
      filteredDisasterEvents,
      filteredResponseTeams,
      filteredIntegrationPoints,
      filteredSystemMetrics,
      acknowledgeAlert,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};