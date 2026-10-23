from datetime import datetime, timezone
import re
from bson import ObjectId
from ..extensions import db_manager
from ..utils.helpers import serialize_doc, serialize_docs, generate_order_id
from .product_service import ProductService

class OrderService:
    @staticmethod
    def get_collection():
        db = db_manager.get_db()
        if db is not None:
            return db.orders
        return None

    @classmethod
    def create_order(cls, payload):
        col = cls.get_collection()
        if col is None:
            raise ValueError("Database connection is not available.")

        # 1. Validate customer & address details
        customer = payload.get("customer", {})
        name = customer.get("name", "").strip()
        email = customer.get("email", "").strip()
        phone = customer.get("phone", "").strip()

        if not name:
            raise ValueError("Customer name is required.")
        if not phone or len(re.sub(r"\D", "", phone)) < 10:
            raise ValueError("A valid 10-digit phone number is required.")
        if not email or "@" not in email:
            raise ValueError("A valid email address is required.")

        address = payload.get("delivery_address", {})
        street = address.get("street", "").strip()
        city = address.get("city", "").strip()
        state = address.get("state", "").strip()
        pin_code = address.get("pin_code", "").strip()
        delivery_instructions = address.get("instructions", "").strip()

        if not street:
            raise ValueError("Street address is required.")
        if not city:
            raise ValueError("City is required.")
        if not pin_code:
            raise ValueError("PIN code is required.")

        # 2. Validate items
        items_input = payload.get("items", [])
        if not items_input or not isinstance(items_input, list):
            raise ValueError("Order must contain at least one item.")

        ordered_snapshots = []
        calculated_subtotal = 0.0

        for item in items_input:
            product_id = item.get("product_id") or item.get("id")
            if not product_id:
                raise ValueError("Each order item must specify a valid product_id.")

            try:
                quantity = int(item.get("quantity", 1))
            except (ValueError, TypeError):
                raise ValueError(f"Invalid quantity for product {product_id}.")

            if quantity < 1:
                raise ValueError(f"Quantity must be at least 1 for product {product_id}.")

            # Fetch authoritative product from MongoDB
            product = ProductService.get_by_id_or_slug(product_id)
            if not product:
                raise ValueError(f"Product '{product_id}' was not found in the catalog.")

            if not product.get("available", True):
                raise ValueError(f"Item '{product.get('name')}' is currently out of stock.")

            unit_price = float(product.get("price", 0.0))
            line_total = round(unit_price * quantity, 2)
            calculated_subtotal += line_total

            ordered_snapshots.append({
                "product_id": product.get("id") or str(product.get("_id")),
                "name": product.get("name"),
                "category": product.get("category"),
                "image": product.get("image"),
                "vegetarian": product.get("vegetarian", False),
                "unit_price": unit_price,
                "quantity": quantity,
                "line_total": line_total
            })

        calculated_subtotal = round(calculated_subtotal, 2)

        # 3. Backend pricing logic: Delivery fee & taxes
        # Free delivery over ₹499, otherwise ₹40
        delivery_fee = 0.0 if calculated_subtotal >= 499 else 40.0
        gst_tax = round(calculated_subtotal * 0.05, 2)  # 5% standard restaurant GST

        # Discount code check
        promo_code = (payload.get("promo_code") or "").strip().upper()
        discount_amount = 0.0
        if promo_code == "CRAVE20":
            # 20% off subtotal up to ₹150 max
            discount_amount = min(round(calculated_subtotal * 0.20, 2), 150.0)
        elif promo_code == "FIRSTFREE":
            discount_amount = delivery_fee

        final_total = round(calculated_subtotal + delivery_fee + gst_tax - discount_amount, 2)

        payment_method = payload.get("payment_method", "cash_on_delivery")
        if payment_method not in ["cash_on_delivery", "demo_upi", "demo_card"]:
            payment_method = "cash_on_delivery"

        order_id = generate_order_id()
        now_dt = datetime.now(timezone.utc)

        order_doc = {
            "order_id": order_id,
            "status": "Confirmed",
            "customer": {
                "name": name,
                "phone": phone,
                "email": email
            },
            "delivery_address": {
                "street": street,
                "city": city,
                "state": state,
                "pin_code": pin_code,
                "instructions": delivery_instructions
            },
            "items": ordered_snapshots,
            "pricing": {
                "subtotal": calculated_subtotal,
                "delivery_fee": delivery_fee,
                "tax": gst_tax,
                "discount": discount_amount,
                "promo_code": promo_code if discount_amount > 0 else None,
                "total": final_total,
                "currency": "INR"
            },
            "payment": {
                "method": payment_method,
                "status": "Pending" if payment_method == "cash_on_delivery" else "Completed (Demo)",
                "paid_at": now_dt.isoformat() if payment_method != "cash_on_delivery" else None
            },
            "status_timeline": [
                {"status": "Order Placed", "timestamp": now_dt.isoformat(), "completed": True},
                {"status": "Kitchen Preparing", "timestamp": None, "completed": False},
                {"status": "Out for Delivery", "timestamp": None, "completed": False},
                {"status": "Delivered", "timestamp": None, "completed": False}
            ],
            "created_at": now_dt,
            "updated_at": now_dt
        }

        col.insert_one(order_doc)
        return serialize_doc(order_doc)

    @classmethod
    def get_orders(cls, email=None, limit=50):
        col = cls.get_collection()
        if col is None:
            return []

        query = {}
        if email:
            query["customer.email"] = {"$regex": f"^{re.escape(email.strip())}$", "$options": "i"}

        cursor = col.find(query).sort("created_at", -1).limit(limit)
        return serialize_docs(list(cursor))

    @classmethod
    def get_order_by_id(cls, order_id):
        col = cls.get_collection()
        if col is None:
            return None

        # Check by custom order_id first (e.g. ORD-20261023-XXXXX)
        doc = col.find_one({"order_id": order_id})
        if not doc and ObjectId.is_valid(order_id):
            doc = col.find_one({"_id": ObjectId(order_id)})

        return serialize_doc(doc)
