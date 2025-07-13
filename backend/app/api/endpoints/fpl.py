from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...services import prediction_service, optimizer_service, fpl_api_service
from ...database import get_db

router = APIRouter()

@router.get("/team/{team_id}")
def get_user_team(team_id: int):
    """
    Fetches a user's FPL team for the current gameweek.
    """
    return fpl_api_service.get_user_team(team_id)

@router.get("/player-projections/")
def get_player_projections(db: Session = Depends(get_db)):
    """
    Returns AI-powered point projections for all players.
    """
    projections = prediction_service.get_all_player_projections(db)
    return projections

@router.post("/optimal-squad/")
def get_optimal_squad(locked_player_ids: list[int] = None):
    """
    Generates the optimal squad based on projections and budget.
    Optionally lock players into the squad.
    """
    squad = optimizer_service.find_optimal_squad(locked_player_ids)
    return squad

@router.post("/transfer-suggestions/{team_id}")
def get_transfer_suggestions(team_id: int):
    """
    Provides intelligent transfer recommendations for a given FPL team.
    """
    suggestions = optimizer_service.suggest_transfers(team_id)
    return suggestions