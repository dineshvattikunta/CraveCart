from flask import Blueprint, request
from ..services.order_service import OrderService
from ..utils.helpers import success_response, error_response

orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/orders", methods=["POST"])
def create_order():
    if not request.is_json:
        return error_response("Request payload must be in JSON format.", status_code=400)

    payload = request.get_json()
    if not payload:
        return error_response("Empty order payload.", status_code=400)

    try:
        order = OrderService.create_order(payload)
        return success_response(data=order, message="Order created successfully.", status_code=201)
    except ValueError as ve:
        return error_response(str(ve), status_code=400)
    except Exception as e:
        return error_response(f"An unexpected error occurred while processing your order: {str(e)}", status_code=500)

@orders_bp.route("/orders", methods=["GET"])
def get_orders():
    try:
        email = request.args.get("email")
        limit = int(request.args.get("limit", 50))
        orders = OrderService.get_orders(email=email, limit=limit)
        return success_response(data=orders)
    except Exception as e:
        return error_response(f"Failed to retrieve orders: {str(e)}", status_code=500)

@orders_bp.route("/orders/<order_id>", methods=["GET"])
def get_order_details(order_id):
    try:
        order = OrderService.get_order_by_id(order_id)
        if not order:
            return error_response(f"Order '{order_id}' was not found.", status_code=404)
        return success_response(data=order)
    except Exception as e:
        return error_response(f"Error retrieving order: {str(e)}", status_code=500)
