import React, { useState } from 'react';
import { getOptimalSquad } from '../services/api';

interface SquadPlayer {
  player_id: number;
  name: string;
  position: string;
}

interface OptimalSquad {
    squad: SquadPlayer[];
    total_cost: number;
    total_projected_points: number;
}

const SquadBuilder: React.FC = () => {
  const [squad, setSquad] = useState<OptimalSquad | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSquad = async () => {
    setLoading(true);
    try {
      const data = await getOptimalSquad();
      setSquad(data);
    } catch (error) {
      console.error("Failed to generate optimal squad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Squad Builder</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-gray-600">
          Click the button to generate the optimal squad based on AI projections, staying within the £100m budget.
        </p>
        <button
          onClick={handleGenerateSquad}
          disabled={loading}
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Optimal Squad'}
        </button>

        {squad && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Suggested Squad</h2>
            <div className="my-2 flex space-x-6">
                <p><strong>Total Cost:</strong> £{squad.total_cost.toFixed(1)}m</p>
                <p><strong>Projected Points (Next GW):</strong> {squad.total_projected_points.toFixed(1)}</p>
            </div>
            <ul className="list-disc list-inside mt-4">
              {squad.squad.map((player) => (
                <li key={player.player_id} className="text-gray-700">
                  {player.name} ({player.position})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadBuilder;