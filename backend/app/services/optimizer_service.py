import pulp
import pandas as pd
from ..services import prediction_service

# --- Functional Optimization Logic ---
# This service uses the PuLP library to solve the classic "knapsack problem"
# for FPL. It finds the highest-scoring team within all budget and formation constraints.

def find_optimal_squad(locked_player_ids: list[int] = None):
    """
    Uses linear programming to find the optimal FPL squad.
    """
    players = pd.DataFrame(prediction_service.get_all_player_projections())
    if players.empty:
        return {"error": "Could not retrieve player data."}
    
    if locked_player_ids is None:
        locked_player_ids = []

    # --- Problem Definition ---
    prob = pulp.LpProblem("FPL_Optimal_Squad", pulp.LpMaximize)

    # --- Decision Variables ---
    # Create a binary variable for each player (1 if chosen, 0 if not)
    player_vars = pulp.LpVariable.dicts("player", players.index, cat='Binary')

    # --- Objective Function ---
    # Maximize the total projected points of the selected players
    prob += pulp.lpSum(players.loc[i, 'projected_points'] * player_vars[i] for i in players.index)

    # --- Constraints ---
    # 1. Budget Constraint (total price <= 100.0)
    prob += pulp.lpSum(players.loc[i, 'price'] * player_vars[i] for i in players.index) <= 100.0

    # 2. Squad Size Constraint (must have 15 players)
    prob += pulp.lpSum(player_vars[i] for i in players.index) == 15

    # 3. Positional Constraints
    position_map = {'GK': 1, 'DEF': 2, 'MID': 3, 'FWD': 4}
    players['position_id'] = players['position'].map(position_map)
    prob += pulp.lpSum(player_vars[i] for i in players.index if players.loc[i, 'position_id'] == 1) == 2  # Goalkeepers
    prob += pulp.lpSum(player_vars[i] for i in players.index if players.loc[i, 'position_id'] == 2) == 5  # Defenders
    prob += pulp.lpSum(player_vars[i] for i in players.index if players.loc[i, 'position_id'] == 3) == 5  # Midfielders
    prob += pulp.lpSum(player_vars[i] for i in players.index if players.loc[i, 'position_id'] == 4) == 3  # Forwards

    # 4. Team Constraint (max 3 players from any one team)
    team_names = players['team_name'].unique()
    for team in team_names:
        prob += pulp.lpSum(player_vars[i] for i in players.index if players.loc[i, 'team_name'] == team) <= 3

    # 5. Locked Players Constraint
    for i in players.index:
        if players.loc[i, 'player_id'] in locked_player_ids:
            prob += player_vars[i] == 1
            
    # --- Solve the Problem ---
    prob.solve(pulp.PULP_CBC_CMD(msg=0)) # msg=0 suppresses solver output

    # --- Format the Output ---
    squad_indices = [i for i in players.index if pulp.value(player_vars[i]) == 1]
    squad_df = players.loc[squad_indices]
    
    total_cost = squad_df['price'].sum()
    total_points = squad_df['projected_points'].sum()

    return {
        "squad": squad_df[['player_id', 'name', 'position', 'price', 'projected_points']].to_dict(orient='records'),
        "total_cost": round(total_cost, 1),
        "total_projected_points": round(total_points, 2)
    }

def suggest_transfers(team_id: int):
    """
    Placeholder for transfer suggestion logic. This is a complex problem.
    A simple approach would be to iterate through each player on the user's team
    and find the best possible upgrade within the budget.
    """
    # This remains a placeholder as it requires significant logic (user's current team,
    # bank, etc.) which is beyond a simple implementation here.
    return [
        {
            "transfer_out": {"name": "Rashford", "points_gain": -2.5},
            "transfer_in": {"name": "Saka", "points_gain": 4.0},
            "net_gain": 1.5
        }
    ]