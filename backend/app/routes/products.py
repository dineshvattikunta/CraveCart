from flask import Blueprint, request
from ..services.product_service import ProductService
from ..utils.helpers import success_response, error_response

products_bp = Blueprint("products", __name__)

@products_bp.route("/products", methods=["GET"])
def get_products():
    try:
        category = request.args.get("category")
        search = request.args.get("q")
        vegetarian = request.args.get("vegetarian")
        min_price = request.args.get("min_price")
        max_price = request.args.get("max_price")
        sort_by = request.args.get("sort")
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 50))
        featured = request.args.get("featured", "").lower() in ["true", "1"]

        result = ProductService.get_products(
            category=category,
            search=search,
            vegetarian=vegetarian,
            min_price=min_price,
            max_price=max_price,
            sort_by=sort_by,
            page=page,
            limit=limit,
            featured_only=featured
        )
        return success_response(
            data=result["products"],
            total=result["total"],
            page=result["page"],
            pages=result["pages"]
        )
    except Exception as e:
        return error_response(f"Failed to fetch products: {str(e)}", status_code=500)

@products_bp.route("/products/featured", methods=["GET"])
def get_featured_products():
    try:
        limit = int(request.args.get("limit", 8))
        products = ProductService.get_featured(limit=limit)
        return success_response(data=products)
    except Exception as e:
        return error_response(f"Failed to fetch featured products: {str(e)}", status_code=500)

@products_bp.route("/products/<identifier>", methods=["GET"])
def get_product(identifier):
    try:
        product = ProductService.get_by_id_or_slug(identifier)
        if not product:
            return error_response(f"Product '{identifier}' not found", status_code=404)
        return success_response(data=product)
    except Exception as e:
        return error_response(f"Error retrieving product: {str(e)}", status_code=500)
