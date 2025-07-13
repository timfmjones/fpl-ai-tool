# Premier League Fantasy AI Strategist

Welcome to the **Premier League Fantasy AI Strategist**! This web application is a comprehensive tool for Fantasy Premier League (FPL) managers, leveraging AI to provide data-driven insights, player performance predictions, and intelligent team recommendations.

## Features

* **FPL Integration**: Securely import your team using your FPL Team ID.
* **AI Player Projections**: Get point predictions for players for the next 5 Gameweeks.
* **Optimal Squad Builder**: AI-powered suggestions for the best 15-player squad within budget.
* **Intelligent Transfer Assistant**: Get smart transfer recommendations for your team.
* **Fixture Difficulty Rating (FDR)**: Plan your long-term strategy with a clear FDR view.
* **Detailed Player Stats**: In-depth statistics and visualizations for every player.

---

## Technical Stack

* **Frontend**: React (with TypeScript), Tailwind CSS, Recharts
* **Backend**: Python (with FastAPI)
* **Database**: PostgreSQL
* **AI/ML**: Placeholder for XGBoost (predictions) & Linear Programming (optimization)
* **Deployment**: Docker

---

## Getting Started

### Prerequisites

* Docker and Docker Compose installed on your machine.
* An FPL Team ID to test the integration.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd premier-league-fantasy-ai-strategist
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in your desired database credentials.

3.  **Build and run the application:**
    From the root directory, run the following command:
    ```bash
    docker-compose up --build
    ```
    This will build the Docker images for the frontend, backend, and database and start the services.

4.  **Access the application:**
    * Frontend application: `http://localhost:3000`
    * Backend API docs: `http://localhost:8000/docs`

---

## Project Structure

The project uses a monorepo structure: