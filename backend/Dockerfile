FROM python:3.11-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000 \
    FLASK_ENV=production

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000 10000

# Run with gunicorn binding dynamically to $PORT (supporting both local 5000 and Render 10000)
CMD sh -c "gunicorn --bind 0.0.0.0:${PORT:-5000} --workers 3 --timeout 120 wsgi:app"
