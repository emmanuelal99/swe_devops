# ===============================================
# Stage 1: Build Dependencies
# ===============================================
FROM python:3.12-slim-bookworm AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install required system dependencies for LogiTrack database
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

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
    PATH="/opt/venv/bin:$PATH" \
    PORT=8000

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN adduser --system --group appuser

COPY --from=builder /opt/venv /opt/venv

# Copy LogiTrack code
COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

# 1. Uploads CSS/JS to S3
# 2. Ensures the PostgreSQL database has the latest tables
# 3. Boots up Gunicorn to serve traffic
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py migrate --noinput && gunicorn --bind 0.0.0.0:8000 --workers 3 mylogistics.wsgi:application"]