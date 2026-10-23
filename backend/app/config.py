import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 5000))
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/cravecart")
    DB_NAME = os.getenv("DB_NAME", "cravecart")
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",")]
    SECRET_KEY = os.getenv("SECRET_KEY", "cravecart-demo-secret-key-change-in-prod")
