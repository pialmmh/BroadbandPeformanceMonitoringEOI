import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Tower } from '../models/Tower.model';
import { NTTNNode } from '../models/NTTNNode.model';
import { Alert } from '../models/Alert.model';
import { DisasterEvent } from '../models/DisasterEvent.model';
import { ResponseTeam } from '../models/ResponseTeam.model';
import { IntegrationPoint } from '../models/IntegrationPoint.model';
import { SystemMetrics } from '../models/SystemMetrics.model';
import { ServiceManager } from '../services';
import { ApiClient } from '../api/ApiClient';

interface DataContextType {
  // Data
  towers: Tower[];
  nttnNodes: NTTNNode[];
  alerts: Alert[];
  disasterEvents: DisasterEvent[];
  responseTeams: ResponseTeam[];
  integrationPoints: IntegrationPoint[];
  systemMetrics: SystemMetrics;
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Actions
  refreshData: () => Promise<void>;
  refreshTowers: () => Promise<void>;
  refreshAlerts: () => Promise<void>;
  acknowledgeAlert: (id: string) => Promise<void>;
  updateTowerStatus: (id: string, status: Tower['status']) => Promise<void>;
  
  // Filters
  filterTowersByStatus: (status: string) => Tower[];
  filterAlertsBySeverity: (severity: string) => Alert[];
  getUnacknowledgedAlerts: () => Alert[];
  getCriticalAlerts: () => Alert[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [towers, setTowers] = useState<Tower[]>([]);
  const [nttnNodes, setNttnNodes] = useState<NTTNNode[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [disasterEvents, setDisasterEvents] = useState<DisasterEvent[]>([]);
  const [responseTeams, setResponseTeams] = useState<ResponseTeam[]>([]);
  const [integrationPoints, setIntegrationPoints] = useState<IntegrationPoint[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(new SystemMetrics({}));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serviceManager = ServiceManager.getInstance();
  const apiClient = ApiClient.getInstance();

  // Fetch data from services
  const fetchTowers = useCallback(async () => {
    try {
      const towerService = serviceManager.getTowerService();
      const data = await towerService.getAllTowers();
      setTowers(data);
    } catch (err) {
      console.error('Error fetching towers:', err);
      setError('Failed to fetch towers');
    }
  }, [serviceManager]);

  const fetchAlerts = useCallback(async () => {
    try {
      const alertService = serviceManager.getAlertService();
      const data = await alertService.getAllAlerts();
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Failed to fetch alerts');
    }
  }, [serviceManager]);

  const fetchNTTNNodes = useCallback(async () => {
    try {
      const data = await apiClient.get<any[]>('/api/nttn-nodes');
      setNttnNodes(data.map(d => NTTNNode.fromJSON(d)));
    } catch (err) {
      console.error('Error fetching NTTN nodes:', err);
    }
  }, [apiClient]);

  const fetchDisasterEvents = useCallback(async () => {
    try {
      const data = await apiClient.get<any[]>('/api/disasters');
      setDisasterEvents(data.map(d => DisasterEvent.fromJSON(d)));
    } catch (err) {
      console.error('Error fetching disaster events:', err);
    }
  }, [apiClient]);

  const fetchResponseTeams = useCallback(async () => {
    try {
      const data = await apiClient.get<any[]>('/api/response-teams');
      setResponseTeams(data.map(d => ResponseTeam.fromJSON(d)));
    } catch (err) {
      console.error('Error fetching response teams:', err);
    }
  }, [apiClient]);

  const fetchIntegrationPoints = useCallback(async () => {
    try {
      const data = await apiClient.get<any[]>('/api/integrations');
      setIntegrationPoints(data.map(d => IntegrationPoint.fromJSON(d)));
    } catch (err) {
      console.error('Error fetching integration points:', err);
    }
  }, [apiClient]);

  const fetchSystemMetrics = useCallback(async () => {
    try {
      const data = await apiClient.get<any[]>('/api/metrics');
      if (data && data.length > 0) {
        setSystemMetrics(SystemMetrics.fromJSON(data[0]));
      }
    } catch (err) {
      console.error('Error fetching system metrics:', err);
    }
  }, [apiClient]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchTowers(),
        fetchAlerts(),
        fetchNTTNNodes(),
        fetchDisasterEvents(),
        fetchResponseTeams(),
        fetchIntegrationPoints(),
        fetchSystemMetrics()
      ]);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, [
    fetchTowers,
    fetchAlerts,
    fetchNTTNNodes,
    fetchDisasterEvents,
    fetchResponseTeams,
    fetchIntegrationPoints,
    fetchSystemMetrics
  ]);

  const refreshTowers = useCallback(async () => {
    await fetchTowers();
  }, [fetchTowers]);

  const refreshAlerts = useCallback(async () => {
    await fetchAlerts();
  }, [fetchAlerts]);

  const acknowledgeAlert = useCallback(async (id: string) => {
    try {
      const alertService = serviceManager.getAlertService();
      const updatedAlert = await alertService.acknowledgeAlert(id);
      if (updatedAlert) {
        setAlerts(prev => prev.map(a => a.id === id ? updatedAlert : a));
      }
    } catch (err) {
      console.error('Error acknowledging alert:', err);
    }
  }, [serviceManager]);

  const updateTowerStatus = useCallback(async (id: string, status: Tower['status']) => {
    try {
      const towerService = serviceManager.getTowerService();
      const updatedTower = await towerService.updateTower(id, { status });
      if (updatedTower) {
        setTowers(prev => prev.map(t => t.id === id ? updatedTower : t));
      }
    } catch (err) {
      console.error('Error updating tower status:', err);
    }
  }, [serviceManager]);

  // Filter functions
  const filterTowersByStatus = useCallback((status: string) => {
    return towers.filter(t => t.status === status);
  }, [towers]);

  const filterAlertsBySeverity = useCallback((severity: string) => {
    return alerts.filter(a => a.severity === severity);
  }, [alerts]);

  const getUnacknowledgedAlerts = useCallback(() => {
    return alerts.filter(a => !a.acknowledged);
  }, [alerts]);

  const getCriticalAlerts = useCallback(() => {
    return alerts.filter(a => a.severity === 'critical' && !a.acknowledged);
  }, [alerts]);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const value: DataContextType = {
    towers,
    nttnNodes,
    alerts,
    disasterEvents,
    responseTeams,
    integrationPoints,
    systemMetrics,
    loading,
    error,
    refreshData,
    refreshTowers,
    refreshAlerts,
    acknowledgeAlert,
    updateTowerStatus,
    filterTowersByStatus,
    filterAlertsBySeverity,
    getUnacknowledgedAlerts,
    getCriticalAlerts
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};