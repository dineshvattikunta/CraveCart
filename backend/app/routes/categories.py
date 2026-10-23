from flask import Blueprint
from ..services.product_service import ProductService
from ..utils.helpers import success_response, error_response

categories_bp = Blueprint("categories", __name__)

@categories_bp.route("/categories", methods=["GET"])
def get_categories():
    try:
        categories = ProductService.get_categories()
        return success_response(data=categories)
    except Exception as e:
        return error_response(f"Failed to fetch categories: {str(e)}", status_code=500)
