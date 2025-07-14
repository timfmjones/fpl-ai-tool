import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';

interface UserProfile {
  email: string;
  fpl_team_id: number | null;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data. You might need to log in.');
        // In a real app, you would redirect to login page here
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My FPL Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Team</h2>
          {user && user.fpl_team_id ? (
            <p className="text-gray-600">Displaying data for FPL Team ID: <strong>{user.fpl_team_id}</strong></p>
          ) : (
            <p className="text-gray-600">No FPL Team ID linked to your account.</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Transfer Suggestion</h2>
          <p className="text-gray-600">AI-powered transfer tips will appear here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Fixtures</h2>
          <p className="text-gray-600">Your team's fixture difficulty will be shown here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;