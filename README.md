# CraveCart — Premium Online Food Ordering Platform

[![Docker Compose](https://img.shields.io/badge/Docker%20Compose-v2-blue?logo=docker)](https://www.docker.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Python%20Flask-000000?logo=flask)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%207.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Nginx](https://img.shields.io/badge/Proxy-Nginx%20Alpine-009639?logo=nginx)](https://nginx.org/)
[![Vercel Frontend](https://img.shields.io/badge/Vercel-Live%20Demo-black?logo=vercel)](https://crave-cart-beta.vercel.app/)
[![Render Backend](https://img.shields.io/badge/Render-API%20Live-46E3B7?logo=render)](https://cravecart-api.onrender.com/api/health)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-green?logo=mongodb)](https://www.mongodb.com/cloud/atlas)

> **🌐 Live Deployment Links:**
> - **Live Web Application (Frontend):** [https://crave-cart-beta.vercel.app/](https://crave-cart-beta.vercel.app/)
> - **Live REST API (Backend):** [https://cravecart-api.onrender.com/api/health](https://cravecart-api.onrender.com/api/health)
> - **Cloud Database:** MongoDB Atlas (AWS cluster)

> **University DevOps & Cloud Architecture Project**  
> An enterprise-grade, fully functional Online Food Ordering platform inspired by the visual design quality, product-grid layouts, refined spacing, and shopping experience of **Bazaar Pro — Multipurpose E-Commerce**.

---

## 🍽️ 1. Project Overview

**CraveCart** is a complete, containerized food-commerce application engineered with a clean separation of concerns:
- **Frontend**: High-performance React Single Page Application (SPA) built with Vite, vanilla modular CSS, and Lucide React icons.
- **Reverse Proxy**: Nginx multi-stage container serving production assets and reverse-proxying API calls with dynamic DNS resolution.
- **Backend**: Python Flask REST API with PyMongo, structured service layers, and authoritative server-side price calculation.
- **Database**: MongoDB with persistent named Docker volumes and health checks.
- **DevOps**: Multi-stage Docker builds, Docker Compose orchestration, automated seeding, and EC2 deployment readiness.

---

## 🏗️ 2. Architecture Diagram

```
+-------------------------------------------------------------------------+
|                           Client Browser                                |
|   (Desktop 1440px / Laptop 1024px / Tablet 768px / Mobile 390px)        |
+-------------------------------------------------------------------------+
                                    |
                    Port 80 / 3000  |  (HTTP Requests)
                                    v
+-------------------------------------------------------------------------+
|                  cravecart_frontend (Nginx Alpine)                      |
|                                                                         |
|  * Serves compiled React production bundle (HTML / JS / CSS / Fonts)    |
|  * SPA Fallback: try_files $uri /index.html                             |
|  * Internal Reverse Proxy: /api/*  -->  http://backend:5000/api/*       |
|  * Embedded Docker DNS: resolver 127.0.0.11 valid=5s                    |
+-------------------------------------------------------------------------+
                                    |
                     Docker Network |  (cravecart_net)
                                    v
+-------------------------------------------------------------------------+
|                   cravecart_backend (Python Flask + Gunicorn)           |
|                                                                         |
|  * Port 5000: Blueprints (/api/health, /api/products, /api/orders)     |
|  * Server-side total calculation (Never trusts client-sent prices)      |
|  * Input validation & unique Order ID generation                        |
+-------------------------------------------------------------------------+
                                    |
                     Docker Network |  (mongodb://mongo:27017/cravecart)
                                    v
+-------------------------------------------------------------------------+
|                      cravecart_mongo (MongoDB 7.0)                      |
|                                                                         |
|  * Internal port 27017 (Not exposed publicly)                           |
|  * Collections: products, categories, orders                            |
|  * Named Volume: mongo_data -> /data/db (Persistent Storage)            |
+-------------------------------------------------------------------------+
```

---

## ✨ 3. Complete Feature List

### 🛍️ Storefront & User Experience
1. **Announcement Header**: Promotional strip displaying real-time delivery deals and promo code `CRAVE20`.
2. **Main Navigation**: Responsive header with CraveCart brand mark, delivery location selector, live search input, quick navigation links, live wishlist counter, and animated cart count badge.
3. **Hero Showcase**: High-impact editorial hero section with appetizing food photography, delivery tags (`⚡ 30 min delivery`, `⭐ 4.9 Foodie Rating`, `🥗 100% Fresh Ingredients`), and primary/secondary CTAs.
4. **Cuisine Tiles**: Visual tiles for **Burgers, Pizza, Indian, Biryani, Asian, Desserts, Healthy, Beverages** that instantly filter the catalog.
5. **Product Cards**: Bazaar Pro-inspired cards featuring Indian veg/non-veg standard indicators, bestseller badges, discount badges, preparation times, and an interactive inline quantity stepper (`[-] count [+]`).
6. **Live Search & Multi-Criteria Filtering**: Filter by category, pure vegetarian toggle, price range, and sort by price, rating, or preparation time.
7. **Product Details View**: Large product photography, full ingredient description, calories, tags, quantity selector, and related items carousel.
8. **Interactive Cart Drawer & Cart Page**: Slide-out bag drawer + full page cart with live item subtotal, delivery fee calculation (Free over ₹499), 5% GST calculation, and promo code support (`CRAVE20` for 20% off, `FIRSTFREE`).
9. **Checkout Experience**: Clean validation form (Name, 10-digit mobile, Email, Street, City, State, PIN code, delivery instructions) with demo payment options (Cash on Delivery & Demo UPI).
10. **Order Confirmation & Tracking**: Generates unique alphanumeric order IDs (e.g. `ORD-20261023-XXXXX`), status timeline (Order Placed -> Kitchen Preparing -> Out for Delivery -> Delivered), customer recap, and order tracking.
11. **My Orders & Favourites**: Retrieve and filter orders by customer email, and save favourites in a persistent wishlist.
12. **Custom 404 Page**: Branded error page with easy return-to-home actions.

---

## 🛠️ 4. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.x | Component UI architecture |
| **Build Tool** | Vite | 8.x | Ultra-fast build & HMR |
| **Icons** | Lucide React | 1.x | Consistent, accessible iconography |
| **Styling** | Vanilla CSS (Modular Tokens) | CSS3 | Custom design system (Bazaar Pro style) |
| **Web Server** | Nginx | Alpine | Static asset hosting & API reverse proxy |
| **Backend** | Python Flask | 3.0.3 | REST API service layer |
| **WSGI Server** | Gunicorn | 22.0.0 | Production HTTP application server |
| **Database** | MongoDB | 7.0 | NoSQL document persistence |
| **DB Driver** | PyMongo | 4.7.2 | MongoDB client for Python |
| **Orchestration** | Docker & Docker Compose | Compose v2 | Multi-container lifecycle & networking |

---

## 📁 5. Project Directory Structure

```
cravecart/
├── docker-compose.yml          # Production multi-container composition
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules for node, python, logs
├── README.md                   # Complete architectural & operational manual
│
├── frontend/                   # React + Vite application
│   ├── Dockerfile              # Multi-stage production build (Node -> Nginx)
│   ├── nginx.conf              # Reverse proxy & SPA routing configuration
│   ├── package.json            # Node dependencies (React, Vite, Lucide)
│   ├── vite.config.js          # Vite configuration with local proxy
│   ├── index.html              # HTML shell with Google Fonts & metadata
│   └── src/
│       ├── main.jsx            # React root mount
│       ├── App.jsx             # Navigation state & layout orchestrator
│       ├── styles/
│       │   ├── variables.css   # Color palette, shadows, spacing tokens
│       │   └── global.css      # Reset, buttons, badges, responsive layout
│       ├── services/
│       │   └── api.js          # REST client communicating with /api
│       ├── context/
│       │   ├── CartContext.jsx         # Cart state, discounts & calculations
│       │   ├── WishlistContext.jsx     # Saved favorites state
│       │   └── NotificationContext.jsx # Toast notification engine
│       ├── components/
│       │   └── common/
│       │       ├── Header.jsx          # Announcement & navigation bar
│       │       ├── Footer.jsx          # Trust badges & footer links
│       │       ├── ProductCard.jsx     # Bazaar Pro food item card
│       │       ├── CartDrawer.jsx      # Slide-out bag overview
│       │       ├── Badge.jsx           # Veg/Non-veg & bestseller badges
│       │       ├── RatingStars.jsx     # Golden star reviews
│       │       ├── LoadingSkeleton.jsx # Shimmer card placeholders
│       │       ├── EmptyState.jsx      # Empty search/cart graphics
│       │       ├── Modal.jsx           # Dialog overlay component
│       │       └── Toast.jsx           # Animated floating notifications
│       └── pages/
│           ├── HomePage.jsx            # Landing page with hero & cuisines
│           ├── ExploreMenuPage.jsx     # Full catalog with filters & search
│           ├── ProductDetailPage.jsx   # Dish details & related recipes
│           ├── CartPage.jsx            # Shopping bag & promo code engine
│           ├── CheckoutPage.jsx        # Validated delivery checkout form
│           ├── OrderConfirmationPage.jsx # Success screen with unique order ID
│           ├── OrdersPage.jsx          # Order history & lookup by email
│           ├── OrderDetailsPage.jsx    # Status timeline tracker
│           ├── WishlistPage.jsx        # Saved favourite items
│           ├── OffersPage.jsx          # Coupon codes & combo promotions
│           └── NotFoundPage.jsx        # Branded 404 handler
│
└── backend/                    # Python Flask REST API
    ├── Dockerfile              # Python 3.11-slim container with Gunicorn
    ├── requirements.txt        # Flask, PyMongo, Gunicorn, Flask-CORS
    ├── wsgi.py                 # Production WSGI entry point
    ├── test_api.py             # Automated end-to-end integration test suite
    ├── .env.example            # Backend environment variables
    ├── scripts/
    │   └── seed_data.py        # 32 realistic dishes & 8 categories seed script
    └── app/
        ├── __init__.py         # Flask app factory, CORS, error handlers
        ├── config.py           # Environment-based configuration
        ├── extensions.py       # PyMongo client & healthcheck ping
        ├── utils/
        │   └── helpers.py      # BSON serializer & Order ID generator
        ├── services/
        │   ├── product_service.py # Catalog queries, filters, sorting
        │   └── order_service.py   # Authoritative price calculation & order persistence
        └── routes/
            ├── __init__.py     # Blueprint registration
            ├── health.py       # GET /api/health
            ├── products.py     # GET /api/products, /api/products/<id>
            ├── categories.py   # GET /api/categories
            └── orders.py       # POST /api/orders, GET /api/orders
```

---

## 🚀 6. Quick Start with Docker Compose (Recommended)

### Prerequisites
- Docker Engine 24+ and Docker Compose v2.
- (Or Docker Desktop on Windows / macOS).

### 1. Build and Start Services
```bash
docker compose up -d --build
```

### 2. Verify Container Health
```bash
docker compose ps
```
All three services should be running:
- `cravecart_frontend` on port `80` (and `3000`)
- `cravecart_backend` on port `5000` (internal network & healthchecked)
- `cravecart_mongo` (internal network with named volume `mongo_data`)

### 3. Seed MongoDB with Sample Data
Run the database seed script inside the backend container:
```bash
docker compose exec backend python scripts/seed_data.py
```
*Output:*
```text
Connecting to MongoDB at: mongodb://mongo:27017/cravecart
MongoDB connection verified successfully.
Seeding 8 categories...
Categories seeded successfully.
Seeding 32 products...
Products seeded successfully.
Done! Database 'cravecart' now has 8 categories and 32 products.
```

### 4. Access the Application
- **Frontend Storefront**: Open [http://localhost:3000](http://localhost:3000) or [http://localhost](http://localhost)
- **API Health Check**: Open [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Product Catalog API**: Open [http://localhost:3000/api/products](http://localhost:3000/api/products)

---

## 💻 7. Local Development Setup (Without Docker)

If you prefer running services directly on your host machine:

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Ensure local MongoDB is running at mongodb://localhost:27017
python scripts/seed_data.py
python wsgi.py
```
*Backend runs at `http://localhost:5000`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend dev server runs at `http://localhost:5173`, automatically proxying `/api` requests to `http://localhost:5000`.*

---

## 📋 8. Docker Lifecycle & Operations Reference

| Operation | Command | Notes |
| :--- | :--- | :--- |
| **Start in Background** | `docker compose up -d` | Starts containers in detached mode |
| **Rebuild & Start** | `docker compose up -d --build` | Recompiles React and rebuilds backend image |
| **Inspect Status** | `docker compose ps` | Displays service status, uptime, and health checks |
| **View All Logs** | `docker compose logs -f` | Follows output logs across all services |
| **Inspect Backend Logs** | `docker compose logs backend --tail 50` | Views the latest 50 lines from Gunicorn |
| **Inspect Frontend Logs** | `docker compose logs frontend --tail 50` | Views Nginx access and error logs |
| **Stop Containers** | `docker compose down` | Stops containers while **preserving MongoDB volume** |
| **Restart Services** | `docker compose restart` | Reboots running containers |
| **Run Integration Tests**| `docker compose exec backend python test_api.py` | Executes complete REST API test suite |
| **Safe Volume Removal** | `docker compose down -v` | ⚠️ **Warning:** Deletes database records permanently |

---

## 💾 9. Database Persistence Explanation

In Docker Compose, database data is stored inside a named volume declared in `docker-compose.yml`:
```yaml
volumes:
  mongo_data:
    driver: local
```
The MongoDB service binds this volume to its data directory:
```yaml
    volumes:
      - mongo_data:/data/db
```
- When you execute `docker compose down`, Docker removes the running containers and network, but **leaves the `mongo_data` volume intact on the host storage disk**.
- When you subsequently run `docker compose up -d`, the new MongoDB container mounts the existing `mongo_data` volume and immediately recovers all previously seeded dishes and placed customer orders.
- Data is only removed if you explicitly provide the `-v` flag (`docker compose down -v`).

---

## 🔌 10. REST API Documentation

### Health Check
- **`GET /api/health`**
  - **Response `200 OK`:**
    ```json
    {
      "database": {
        "status": "connected",
        "type": "MongoDB"
      },
      "service": "CraveCart REST API",
      "status": "healthy",
      "timestamp": "2026-10-23T16:30:40.111011+00:00"
    }
    ```

### Categories
- **`GET /api/categories`**
  - Returns list of cuisines (`Burgers`, `Pizza`, `Indian`, `Biryani`, `Asian`, `Desserts`, `Healthy`, `Beverages`).

### Products Catalog
- **`GET /api/products`**
  - **Query Parameters:**
    - `q` (string): Text search across name, category, and description.
    - `category` (string): Filter by cuisine name (e.g. `Biryani`).
    - `vegetarian` (boolean): `true` for pure veg only, `false` for non-veg.
    - `min_price` / `max_price` (numeric): Price bounding.
    - `sort` (string): `price_asc`, `price_desc`, `rating`, `prep_time`, `featured`.
    - `page` (int) / `limit` (int): Pagination controls.
  - **Response `200 OK`:**
    ```json
    {
      "success": true,
      "total": 32,
      "page": 1,
      "pages": 4,
      "data": [
        {
          "id": "6adb8ba3a2f76d9d58a526b3",
          "name": "Wood-Fired Margherita Basilico",
          "slug": "wood-fired-margherita-basilico",
          "category": "Pizza",
          "price": 429.0,
          "original_price": 499.0,
          "vegetarian": true,
          "rating": 4.9,
          "review_count": 320,
          "preparation_time": "20-25 mins",
          "is_bestseller": true,
          "available": true,
          "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
    ```

- **`GET /api/products/<identifier>`**
  - Retrieve single dish by MongoDB ObjectId or URL slug.

- **`GET /api/products/featured`**
  - Returns curated top-rated signature dishes.

### Orders
- **`POST /api/orders`**
  - Places an order. **Prices are recalculated authoritatively on the server from MongoDB.**
  - **Request Payload:**
    ```json
    {
      "customer": {
        "name": "Rahul Sharma",
        "phone": "9876543210",
        "email": "rahul@example.com"
      },
      "delivery_address": {
        "street": "Flat 302, Green Glen, 100 Feet Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pin_code": "560038",
        "instructions": "Ring bell once"
      },
      "items": [
        {
          "product_id": "6adb8ba3a2f76d9d58a526b3",
          "quantity": 2
        }
      ],
      "payment_method": "cash_on_delivery",
      "promo_code": "CRAVE20"
    }
    ```
  - **Response `201 Created`:**
    ```json
    {
      "success": true,
      "message": "Order created successfully.",
      "data": {
        "order_id": "ORD-20261023-XTSEW",
        "status": "Confirmed",
        "pricing": {
          "subtotal": 858.0,
          "delivery_fee": 0.0,
          "tax": 42.9,
          "discount": 150.0,
          "total": 750.9,
          "currency": "INR"
        }
      }
    }
    ```

- **`GET /api/orders?email=<customer_email>`**
  - Retrieve order history filtered by customer email.

- **`GET /api/orders/<order_id>`**
  - Retrieve detailed tracking info and breakdown for a specific order.

---

## ☁️ 11. AWS EC2 Deployment Guide

To deploy CraveCart onto an Ubuntu EC2 instance on AWS:

### 1. Launch EC2 Instance
- **AMI**: Ubuntu 24.04 LTS (x86_64).
- **Instance Type**: `t3.small` or `t3.medium` (recommended for Docker builds).
- **Security Group Inbound Rules**:
  - `TCP 22` (SSH) — Your IP only.
  - `TCP 80` (HTTP) — Anywhere (`0.0.0.0/0`).
  - `TCP 3000` (Optional alternative HTTP port).

### 2. Connect & Install Docker
```bash
ssh -i your-key.pem ubuntu@ec2-your-instance-ip.compute-1.amazonaws.com

# Update packages and install Docker
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y docker.io docker-compose-v2 git

# Enable and start Docker service
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
newgrp docker
```

### 3. Clone Repository & Run
```bash
git clone https://github.com/your-username/cravecart.git
cd cravecart

# Build and start services
docker compose up -d --build

# Seed sample products
docker compose exec backend python scripts/seed_data.py
```
*Your application is now live at `http://<ec2-public-ip>`!*

---

## 🔒 12. Security & University Project Limitations

This application was engineered for demonstration of full-stack engineering, premium UI/UX design, and DevOps orchestration:
- **Server-Side Trust**: Client-sent product prices are ignored; totals and taxes are recalculated from MongoDB records.
- **Environment Isolation**: Secrets and connection strings are injected via environment variables.
- **Port Masking**: MongoDB port 27017 is isolated to the private Docker bridge network and not exposed to the public internet.
- **Demo Payments**: Credit card forms and live payment gateway contracts are intentionally mocked (Cash on Delivery & Demo UPI). Real commercial applications require integration with PCI-DSS compliant providers (e.g. Razorpay, Stripe) with webhook verification.
- **Authentication**: Customer identification is simulated via email and phone. A production deployment requires OAuth2 / JWT authentication, rate limiting (Redis), and role-based access control.

---

## ✅ 13. Testing & Verification Checklist

- [x] **Frontend Production Build**: `npm run build` succeeds with zero errors.
- [x] **Backend Syntax Verification**: All Python modules compiled via `py_compile`.
- [x] **Multi-stage Docker Builds**: Both `frontend` (Nginx + Node) and `backend` (Python 3.11-slim) built successfully.
- [x] **Docker Compose Orchestration**: All 3 containers (`cravecart_frontend`, `cravecart_backend`, `cravecart_mongo`) running and healthy.
- [x] **Database Seeding**: 32 appetizing food dishes across 8 categories populated into MongoDB.
- [x] **Nginx Reverse Proxy**: `/api/*` requests seamlessly proxied to `backend:5000` with Docker DNS resolver.
- [x] **End-to-End API Suite**: Automated `backend/test_api.py` verified health, catalog search, coupon engine, order creation, and order lookup.
- [x] **Database Volume Persistence**: Tested `docker compose down` followed by `docker compose up -d`; confirmed order records survived container deletion.
- [x] **Browser Subagent E2E Flow**: Tested live user flow at `http://localhost:3000` (Search, Category filter, Cart drawer, Checkout form submission, Order confirmation).
- [x] **Mobile Responsiveness**: Verified layout scaling, hamburger navigation drawer, and single-column grid at 390px mobile viewport.
