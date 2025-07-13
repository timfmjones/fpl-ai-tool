import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// FPL Data Services
export const getPlayerProjections = async () => {
  const response = await api.get('/fpl/player-projections/');
  return response.data;
};

export const getOptimalSquad = async (lockedPlayerIds: number[] = []) => {
  const response = await api.post('/fpl/optimal-squad/', lockedPlayerIds);
  return response.data;
};

// Add other API functions as needed...