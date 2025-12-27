export const ApiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'X-Client-Version': '1.0.0',
    'X-Client-Platform': 'web'
  },
  endpoints: {
    towers: '/api/towers',
    nttnNodes: '/api/nttn-nodes',
    alerts: '/api/alerts',
    disasters: '/api/disasters',
    responseTeams: '/api/response-teams',
    integrations: '/api/integrations',
    metrics: '/api/metrics'
  }
};