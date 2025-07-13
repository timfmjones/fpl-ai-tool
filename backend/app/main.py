from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .api.endpoints import fpl, users
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Premier League Fantasy AI Strategist")

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows frontend to communicate
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(fpl.router, prefix="/api/fpl", tags=["FPL"])

@app.get("/api")
def root():
    return {"message": "Welcome to the Premier League Fantasy AI Strategist API"}