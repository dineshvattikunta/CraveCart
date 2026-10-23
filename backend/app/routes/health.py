from flask import Blueprint, jsonify
from datetime import datetime, timezone
from ..extensions import db_manager

health_bp = Blueprint("health", __name__)

@health_bp.route("/health", methods=["GET"])
def check_health():
    db_connected = db_manager.is_connected()
    status_code = 200 if db_connected else 503
    return jsonify({
        "status": "healthy" if db_connected else "degraded",
        "service": "CraveCart REST API",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "database": {
            "status": "connected" if db_connected else "disconnected",
            "type": "MongoDB"
        }
    }), status_code
