import React, { useState, useEffect } from 'react';
import { getPlayerProjections } from '../services/api';

interface Player {
  player_id: number;
  name: string;
  team: string;
  position: string;
  price: number;
  projected_points_gw1: number;
  projected_points_gw2: number;
}

const PlayerAnalysis: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getPlayerProjections();
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch player projections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) return <p>Loading player data...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Player Projections</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Team</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">GW1 Pts</th>
              <th className="p-4 text-left">GW2 Pts</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.player_id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{player.name}</td>
                <td className="p-4">{player.team}</td>
                <td className="p-4">{player.position}</td>
                <td className="p-4">£{player.price.toFixed(1)}m</td>
                <td className="p-4">{player.projected_points_gw1.toFixed(1)}</td>
                <td className="p-4">{player.projected_points_gw2.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerAnalysis;