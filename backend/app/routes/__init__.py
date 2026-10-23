from .health import health_bp
from .products import products_bp
from .categories import categories_bp
from .orders import orders_bp

def register_routes(app):
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(products_bp, url_prefix="/api")
    app.register_blueprint(categories_bp, url_prefix="/api")
    app.register_blueprint(orders_bp, url_prefix="/api")
