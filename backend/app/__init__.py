import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config
from .extensions import db_manager
from .routes import register_routes

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
)

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}})

    # Initialize extensions
    db_manager.init_app(app)

    # Register blueprints
    register_routes(app)

    @app.route("/", methods=["GET"])
    def index():
        return jsonify({
            "service": "CraveCart API",
            "version": "1.0.0",
            "endpoints": {
                "health": "/api/health",
                "products": "/api/products",
                "categories": "/api/categories",
                "orders": "/api/orders"
            }
        })

    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({"success": False, "error": "Endpoint not found"}), 404

    @app.errorhandler(500)
    def handle_server_error(e):
        return jsonify({"success": False, "error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    port = app.config.get("PORT", 5000)
    app.run(host="0.0.0.0", port=port, debug=app.config.get("DEBUG", False))
