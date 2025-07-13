FROM python:3.9-slim

WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# This Dockerfile is configured for development with --reload.
# For production, you would use a different command, e.g., with gunicorn.