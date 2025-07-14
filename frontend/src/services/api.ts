import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth Services ---
export const loginUser = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  const response = await api.post('/users/token', params);
  return response.data;
};

export const registerUser = async (email: string, password: string, fplTeamId: number | null) => {
    const userData = {
        email,
        password,
        fpl_team_id: fplTeamId
    };
    const response = await api.post('/users/register', userData);
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await api.get('/users/me');
    return response.data;
}

// --- FPL Data Services ---
export const getPlayerProjections = async () => {
  const response = await api.get('/fpl/player-projections/');
  return response.data;
};

export const getOptimalSquad = async (lockedPlayerIds: number[] = []) => {
  const response = await api.post('/fpl/optimal-squad/', lockedPlayerIds);
  return response.data;
};