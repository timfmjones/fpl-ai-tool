import React from 'react';

const Dashboard: React.FC = () => {
  // Fetch user's team data, upcoming fixtures, and transfer suggestions here
  const teamId = 12345; // Hardcoded for example

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My FPL Dashboard</h1>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Team (ID: {teamId})</h2>
          <p className="text-gray-600">Your team details will be displayed here.</p>
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