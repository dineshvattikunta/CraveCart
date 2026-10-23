from bson import ObjectId
from datetime import datetime, timezone
import random
import string
from flask import jsonify

def serialize_doc(doc):
    """Recursively serialize MongoDB document for JSON responses."""
    if not doc:
        return None
    serialized = {}
    for key, value in doc.items():
        if key == "_id":
            serialized["id"] = str(value)
        elif isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, datetime):
            serialized[key] = value.isoformat()
        elif isinstance(value, list):
            serialized[key] = [
                serialize_doc(item) if isinstance(item, dict) else (
                    str(item) if isinstance(item, ObjectId) else (
                        item.isoformat() if isinstance(item, datetime) else item
                    )
                )
                for item in value
            ]
        elif isinstance(value, dict):
            serialized[key] = serialize_doc(value)
        else:
            serialized[key] = value
    return serialized

def serialize_docs(docs):
    return [serialize_doc(doc) for doc in docs]

def generate_order_id():
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"ORD-{now_str}-{random_suffix}"

def success_response(data=None, message="Success", status_code=200, **kwargs):
    response = {
        "success": True,
        "message": message,
        "data": data
    }
    response.update(kwargs)
    return jsonify(response), status_code

def error_response(message="An error occurred", status_code=400, details=None):
    response = {
        "success": False,
        "error": message
    }
    if details:
        response["details"] = details
    return jsonify(response), status_code
