import pandas as pd
from ..services import fpl_api_service

# --- Functional AI Logic ---
# This service now fetches live FPL data and applies a simple weighted model
# to predict player performance.

def get_all_player_projections():
    """
    Fetches all player data and calculates a projected score for the next gameweek.
    
    The model is a simple weighted average of key performance indicators.
    - Form: Player's performance over the last 30 days.
    - Points Per Game (PPG): Season-long performance.
    - ICT Index: A combination of Influence, Creativity, and Threat.
    """
    bootstrap_data = fpl_api_service.get_bootstrap_static()
    if not bootstrap_data:
        return []

    players_df = pd.DataFrame(bootstrap_data['elements'])
    
    # Convert relevant columns to numeric, coercing errors to NaN
    cols_to_numeric = ['form', 'points_per_game', 'ict_index', 'now_cost']
    for col in cols_to_numeric:
        players_df[col] = pd.to_numeric(players_df[col], errors='coerce')

    # Drop players with no data and fill any remaining NaNs with 0
    players_df.dropna(subset=cols_to_numeric, inplace=True)
    players_df.fillna(0, inplace=True)

    # Simple weighted scoring model
    # Weights can be tuned for better performance
    weights = {
        'form': 0.4,
        'points_per_game': 0.3,
        'ict_index': 0.3
    }
    
    players_df['projected_points'] = (
        players_df['form'] * weights['form'] +
        players_df['points_per_game'] * weights['points_per_game'] +
        players_df['ict_index'] * weights['ict_index']
    )

    # Select and format the output
    output_cols = [
        'id', 'web_name', 'team', 'element_type', 'now_cost', 'projected_points'
    ]
    
    # Map IDs to human-readable names
    teams_map = {team['id']: team['short_name'] for team in bootstrap_data['teams']}
    positions_map = {pos['id']: pos['singular_name_short'] for pos in bootstrap_data['element_types']}

    projections_df = players_df[output_cols].copy()
    projections_df['team_name'] = projections_df['team'].map(teams_map)
    projections_df['position'] = projections_df['element_type'].map(positions_map)
    projections_df['price'] = projections_df['now_cost'] / 10.0
    
    # Rename for consistency with frontend
    projections_df.rename(columns={'id': 'player_id', 'web_name': 'name'}, inplace=True)

    return projections_df[['player_id', 'name', 'team_name', 'position', 'price', 'projected_points']].to_dict(orient='records')