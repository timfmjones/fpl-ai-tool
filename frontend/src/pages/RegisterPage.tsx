import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fplTeamId, setFplTeamId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Convert team ID to number, or null if empty
    const teamIdNumber = fplTeamId ? parseInt(fplTeamId, 10) : null;
    if (typeof teamIdNumber === "number" && isNaN(teamIdNumber)) {
        setError("FPL Team ID must be a number.");
        return;
    }

    try {
      await registerUser(email, password, teamIdNumber);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create account.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">FPL Team ID (Optional)</label>
            <input
              type="text"
              value={fplTeamId}
              onChange={(e) => setFplTeamId(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md"
              placeholder="e.g., 12345"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;