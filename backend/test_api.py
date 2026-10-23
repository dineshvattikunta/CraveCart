import urllib.request
import urllib.error
import json

BASE_URL = "http://localhost:80/api"

def test_endpoints():
    print("=== Testing CraveCart API via Nginx Proxy (port 80) ===")

    # 1. Health check
    print("\n1. Testing GET /api/health...")
    req = urllib.request.urlopen(f"{BASE_URL}/health")
    health_data = json.loads(req.read().decode())
    print("Health Status:", health_data.get("status"))
    print("Database:", health_data.get("database"))
    assert health_data.get("status") == "healthy"

    # 2. Categories
    print("\n2. Testing GET /api/categories...")
    req = urllib.request.urlopen(f"{BASE_URL}/categories")
    cat_data = json.loads(req.read().decode())
    print(f"Categories found: {len(cat_data.get('data', []))}")
    assert len(cat_data.get("data", [])) >= 8

    # 3. Products
    print("\n3. Testing GET /api/products...")
    req = urllib.request.urlopen(f"{BASE_URL}/products?limit=5")
    prod_data = json.loads(req.read().decode())
    print(f"Total products in DB: {prod_data.get('total')}")
    assert prod_data.get("total", 0) >= 30
    first_product = prod_data["data"][0]
    print(f"Sample product: {first_product['name']} (₹{first_product['price']}) - {first_product['category']}")

    # 4. Search and Filter
    print("\n4. Testing GET /api/products with search & filter...")
    req = urllib.request.urlopen(f"{BASE_URL}/products?category=Biryani&vegetarian=false")
    biryani_data = json.loads(req.read().decode())
    print(f"Biryani non-veg dishes found: {len(biryani_data.get('data', []))}")
    assert len(biryani_data.get("data", [])) > 0

    # 5. Place an order
    print("\n5. Testing POST /api/orders...")
    order_payload = {
        "customer": {
            "name": "DevOps Evaluator",
            "email": "evaluator@university.edu",
            "phone": "9876543210"
        },
        "delivery_address": {
            "street": "123 Tech Campus Road, Block B",
            "city": "Bengaluru",
            "state": "Karnataka",
            "pin_code": "560100",
            "instructions": "Deliver to DevOps Lab"
        },
        "items": [
            {
                "product_id": first_product["id"],
                "quantity": 2
            }
        ],
        "promo_code": "CRAVE20",
        "payment_method": "cash_on_delivery"
    }

    req = urllib.request.Request(
        f"{BASE_URL}/orders",
        data=json.dumps(order_payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    res = urllib.request.urlopen(req)
    order_res = json.loads(res.read().decode())
    created_order = order_res.get("data", {})
    order_id = created_order.get("order_id")
    print(f"Order created successfully! Order ID: {order_id}")
    print(f"Order Total: ₹{created_order.get('pricing', {}).get('total')} (Subtotal: ₹{created_order.get('pricing', {}).get('subtotal')}, Discount: ₹{created_order.get('pricing', {}).get('discount')})")
    assert order_id is not None

    # 6. Retrieve the order by ID
    print(f"\n6. Testing GET /api/orders/{order_id}...")
    req = urllib.request.urlopen(f"{BASE_URL}/orders/{order_id}")
    retrieved_data = json.loads(req.read().decode())
    retrieved_order = retrieved_data.get("data", {})
    print(f"Retrieved Order Status: {retrieved_order.get('status')}")
    print(f"Customer Name: {retrieved_order.get('customer', {}).get('name')}")
    assert retrieved_order.get("order_id") == order_id

    # 7. Retrieve orders by email
    print(f"\n7. Testing GET /api/orders?email=evaluator@university.edu...")
    req = urllib.request.urlopen(f"{BASE_URL}/orders?email=evaluator@university.edu")
    user_orders = json.loads(req.read().decode())
    print(f"User orders found: {len(user_orders.get('data', []))}")
    assert len(user_orders.get("data", [])) >= 1

    print("\n✅ ALL INTEGRATION TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_endpoints()
