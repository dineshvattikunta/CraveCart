from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.client = None
        self.db = None

    def init_app(self, app):
        mongo_uri = app.config.get("MONGO_URI", "mongodb://localhost:27017/cravecart")
        db_name = app.config.get("DB_NAME", "cravecart")
        try:
            # serverSelectionTimeoutMS is set so health checks don't hang if Mongo is temporarily starting
            self.client = MongoClient(mongo_uri, serverSelectionTimeoutMS=3000)
            self.db = self.client[db_name]
            logger.info("Initialized MongoDB connection with URI: %s", mongo_uri.split("@")[-1])
        except Exception as e:
            logger.error("Failed to connect to MongoDB: %s", e)
            self.client = None
            self.db = None

    def get_db(self):
        return self.db

    def is_connected(self):
        if not self.client:
            return False
        try:
            self.client.admin.command('ping')
            return True
        except (ConnectionFailure, ServerSelectionTimeoutError, Exception):
            return False

db_manager = Database()
