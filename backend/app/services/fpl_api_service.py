import requests

FPL_API_BASE_URL = "https://fantasy.premierleague.com/api/"

def get_bootstrap_static():
    """
    Fetches the main FPL bootstrap data (players, teams, etc.).
    """
    url = f"{FPL_API_BASE_URL}bootstrap-static/"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching FPL bootstrap data: {e}")
        return None

def get_user_team(team_id: int):
    """
    Fetches a specific user's team for the current gameweek.
    """
    url = f"{FPL_API_BASE_URL}my-team/{team_id}/"
    try:
        # Note: The official API might require authentication for this endpoint.
        # This is a simplified example.
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching user team data for team_id {team_id}: {e}")
        return None