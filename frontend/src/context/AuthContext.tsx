import React, { createContext, useState, ReactNode } from 'react';
import { loginUser } from '../services/api';

interface User {
  email: string;
  fpl_team_id: number | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // In a real app, you'd initialize this from localStorage

  const login = async (email: string, password: string) => {
    const { access_token } = await loginUser(email, password);
    localStorage.setItem('token', access_token);
    // In a full implementation, you would now fetch user details using the token
    // For now, we'll just set a placeholder user or decode the token if it contains user info
    // This part would need the /api/users/me endpoint to be called.
    // For simplicity, we'll assume the team ID needs to be fetched separately.
    setUser({ email, fpl_team_id: null }); // Placeholder, will be updated in Dashboard
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};