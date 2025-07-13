from pydantic import BaseModel, EmailStr
from typing import Optional

# Pydantic models (schemas) for API data validation.

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    fpl_team_id: Optional[int] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    fpl_team_id: Optional[int] = None

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str