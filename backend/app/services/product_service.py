import re
from bson import ObjectId
from bson.errors import InvalidId
from ..extensions import db_manager
from ..utils.helpers import serialize_doc, serialize_docs

class ProductService:
    @staticmethod
    def get_collection():
        db = db_manager.get_db()
        if db is not None:
            return db.products
        return None

    @staticmethod
    def get_categories_collection():
        db = db_manager.get_db()
        if db is not None:
            return db.categories
        return None

    @classmethod
    def get_products(cls, category=None, search=None, vegetarian=None, min_price=None, max_price=None, sort_by=None, page=1, limit=50, featured_only=False):
        col = cls.get_collection()
        if col is None:
            return {"products": [], "total": 0, "page": page, "pages": 0}

        query = {}
        if featured_only:
            query["featured"] = True

        if category and category.lower() != "all":
            query["category"] = {"$regex": f"^{re.escape(category)}$", "$options": "i"}

        if vegetarian is not None:
            if isinstance(vegetarian, str):
                if vegetarian.lower() in ["true", "1", "yes"]:
                    query["vegetarian"] = True
                elif vegetarian.lower() in ["false", "0", "no"]:
                    query["vegetarian"] = False
            elif isinstance(vegetarian, bool):
                query["vegetarian"] = vegetarian

        price_query = {}
        if min_price is not None:
            try:
                price_query["$gte"] = float(min_price)
            except (ValueError, TypeError):
                pass
        if max_price is not None:
            try:
                price_query["$lte"] = float(max_price)
            except (ValueError, TypeError):
                pass
        if price_query:
            query["price"] = price_query

        if search:
            escaped_search = re.escape(search.strip())
            query["$or"] = [
                {"name": {"$regex": escaped_search, "$options": "i"}},
                {"description": {"$regex": escaped_search, "$options": "i"}},
                {"category": {"$regex": escaped_search, "$options": "i"}}
            ]

        # Sorting
        sort_config = [("featured", -1), ("rating", -1)]
        if sort_by == "price_asc":
            sort_config = [("price", 1)]
        elif sort_by == "price_desc":
            sort_config = [("price", -1)]
        elif sort_by == "rating":
            sort_config = [("rating", -1)]
        elif sort_by == "name_asc":
            sort_config = [("name", 1)]
        elif sort_by == "prep_time":
            sort_config = [("preparation_time", 1)]

        total = col.count_documents(query)
        skip = (page - 1) * limit
        cursor = col.find(query).sort(sort_config).skip(skip).limit(limit)

        products = serialize_docs(list(cursor))
        pages = (total + limit - 1) // limit if limit > 0 else 1

        return {
            "products": products,
            "total": total,
            "page": page,
            "pages": pages,
            "limit": limit
        }

    @classmethod
    def get_featured(cls, limit=8):
        res = cls.get_products(featured_only=True, limit=limit)
        return res["products"]

    @classmethod
    def get_by_id_or_slug(cls, identifier):
        col = cls.get_collection()
        if col is None:
            return None

        # Try ObjectId
        doc = None
        if ObjectId.is_valid(identifier):
            try:
                doc = col.find_one({"_id": ObjectId(identifier)})
            except InvalidId:
                pass

        # Try slug or custom id field
        if not doc:
            doc = col.find_one({"slug": identifier})

        if not doc:
            doc = col.find_one({"id": identifier})

        return serialize_doc(doc)

    @classmethod
    def get_categories(cls):
        cat_col = cls.get_categories_collection()
        if cat_col is not None and cat_col.count_documents({}) > 0:
            return serialize_docs(list(cat_col.find({}).sort("order", 1)))

        # Fallback to distinct categories in products collection
        prod_col = cls.get_collection()
        if prod_col is not None:
            distinct_names = prod_col.distinct("category")
            return [{"name": name, "slug": name.lower()} for name in distinct_names]

        return []
