# ===============================================
# Stage 1: Build Dependencies
# ===============================================
FROM python:3.12-slim-bookworm AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies required for building psycopg2 (PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a virtual environment to hold all installed packages
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ===============================================
# Stage 2: Production Server
# ===============================================
FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

WORKDIR /app

# Install the lightweight runtime library required by psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user (security best practice)
RUN adduser --system --group appuser

# Copy the virtual environment from the builder stage
COPY --from=builder /opt/venv /opt/venv

# Copy your LogiTrack code
COPY . .

# Change ownership to the non-root user
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

# The Ultimate Startup Command:
# 1. Uploads CSS/JS to S3
# 2. Ensures the PostgreSQL database has the latest tables
# 3. Boots up Gunicorn to serve traffic
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py migrate --noinput && gunicorn --bind 0.0.0.0:8000 --workers 3 mylogistics.wsgi:application"]