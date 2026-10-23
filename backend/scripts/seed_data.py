import os
import sys
# pyrefly: ignore[missing-import]
from pymongo import MongoClient

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/cravecart")
DB_NAME = os.getenv("DB_NAME", "cravecart")

CATEGORIES = [
    {
        "name": "Burgers",
        "slug": "burgers",
        "order": 1,
        "description": "Artisanal brioche buns, charred patties, and melted gourmet cheeses.",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Pizza",
        "slug": "pizza",
        "order": 2,
        "description": "Slow-fermented Neapolitan dough with San Marzano tomatoes and fior di latte.",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Indian",
        "slug": "indian",
        "order": 3,
        "description": "Rich curries, slow-simmered gravies, and tandoori charcoal specialties.",
        "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Biryani",
        "slug": "biryani",
        "order": 4,
        "description": "Fragrant long-grain basmati dum-cooked with saffron, rose water, and tender cuts.",
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Asian",
        "slug": "asian",
        "order": 5,
        "description": "Handcrafted dim sums, fiery wok-tossed noodles, and soothing broths.",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Desserts",
        "slug": "desserts",
        "order": 6,
        "description": "Decadent dark chocolate molten cakes, artisanal cheesecakes, and heritage sweets.",
        "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Healthy",
        "slug": "healthy",
        "order": 7,
        "description": "Nutrient-packed superfood grain bowls, crisp organic salads, and lean proteins.",
        "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
        "name": "Beverages",
        "slug": "beverages",
        "order": 8,
        "description": "Cold-pressed juices, nitro cold brews, creamy lassis, and botanical infusions.",
        "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80"
    }
]

PRODUCTS = [
    # --- BURGERS ---
    {
        "name": "Smoked BBQ Bacon Cheeseburger",
        "slug": "smoked-bbq-bacon-cheeseburger",
        "category": "Burgers",
        "description": "Char-grilled prime beef patty glazed with hickory bourbon BBQ sauce, topped with crispy smoked bacon, aged cheddar, caramelized onions, and house aioli on toasted brioche.",
        "price": 389.0,
        "original_price": 449.0,
        "vegetarian": False,
        "rating": 4.8,
        "review_count": 142,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        "calories": "680 kcal",
        "tags": ["Bestseller", "Chef Special"]
    },
    {
        "name": "Truffle Mushroom & Swiss Melt",
        "slug": "truffle-mushroom-swiss-melt",
        "category": "Burgers",
        "description": "Crispy seasoned portobello cap and roasted wild forest mushrooms with melted Swiss Gruyère and aromatic white truffle emulsion.",
        "price": 349.0,
        "original_price": 399.0,
        "vegetarian": True,
        "rating": 4.7,
        "review_count": 98,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15-20 mins",
        "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        "calories": "520 kcal",
        "tags": ["Gourmet"]
    },
    {
        "name": "Peri-Peri Crispy Chicken Crunch",
        "slug": "peri-peri-crispy-chicken-crunch",
        "category": "Burgers",
        "description": "Buttermilk-brined crisp fried chicken breast tossed in zesty African bird's eye chili glaze with creamy purple cabbage slaw and pickled jalapeños.",
        "price": 319.0,
        "original_price": 369.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 210,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "18-22 mins",
        "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
        "calories": "590 kcal",
        "tags": ["Spicy", "Bestseller"]
    },
    {
        "name": "Classic Smashed Paneer Slider",
        "slug": "classic-smashed-paneer-slider",
        "category": "Burgers",
        "description": "Spiced tandoori cottage cheese patty seared to golden perfection, layered with mint coriander relish, crisp iceberg lettuce, and smoked paprika mayo.",
        "price": 249.0,
        "original_price": 289.0,
        "vegetarian": True,
        "rating": 4.6,
        "review_count": 86,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15 mins",
        "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        "calories": "460 kcal",
        "tags": ["Veg Favourite"]
    },

    # --- PIZZA ---
    {
        "name": "Wood-Fired Margherita Basilico",
        "slug": "wood-fired-margherita-basilico",
        "category": "Pizza",
        "description": "Authentic Neapolitan blistered crust topped with crushed San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet Genovese basil, and extra virgin olive oil.",
        "price": 429.0,
        "original_price": 499.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 320,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
        "calories": "780 kcal",
        "tags": ["Italian Classic", "Bestseller"]
    },
    {
        "name": "Spicy Pepperoni & Hot Honey",
        "slug": "spicy-pepperoni-hot-honey",
        "category": "Pizza",
        "description": "Generously layered with cupping artisanal pepperoni, chili-infused organic honey drizzle, aged whole-milk mozzarella, and cracked red pepper flakes.",
        "price": 549.0,
        "original_price": 629.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 184,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "22-26 mins",
        "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        "calories": "910 kcal",
        "tags": ["Top Rated"]
    },
    {
        "name": "Pesto Burrata & Cherry Tomato",
        "slug": "pesto-burrata-cherry-tomato",
        "category": "Pizza",
        "description": "Creamy whole Puglia burrata centered on pine nut basil pesto sauce, blistered heirloom cherry tomatoes, and aged balsamic glaze.",
        "price": 529.0,
        "original_price": 599.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 73,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        "calories": "820 kcal",
        "tags": ["Artisanal"]
    },
    {
        "name": "BBQ Smoked Chicken & Jalapeño",
        "slug": "bbq-smoked-chicken-jalapeno",
        "category": "Pizza",
        "description": "Tender shredded tandoori BBQ chicken, roasted bell peppers, fiery jalapeño rounds, red onions, and smoked gouda cheese blend.",
        "price": 479.0,
        "original_price": 549.0,
        "vegetarian": False,
        "rating": 4.7,
        "review_count": 115,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        "calories": "860 kcal",
        "tags": ["Customer Favourite"]
    },

    # --- INDIAN ---
    {
        "name": "Old Delhi Butter Chicken",
        "slug": "old-delhi-butter-chicken",
        "category": "Indian",
        "description": "Succulent tandoor-roasted chicken tikka simmered in a velvet-smooth makhani gravy of San Marzano tomatoes, churned butter, and fragrant dried fenugreek leaves (kasuri methi).",
        "price": 449.0,
        "original_price": 499.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 420,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "25-30 mins",
        "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        "calories": "640 kcal",
        "tags": ["Heritage", "All-Time Favourite"]
    },
    {
        "name": "Paneer Tikka Lababdar",
        "slug": "paneer-tikka-lababdar",
        "category": "Indian",
        "description": "Charred cubes of fresh malai paneer folded into a rich, luscious cashew-tomato gravy garnished with grated cottage cheese and freshly cracked cardamom.",
        "price": 379.0,
        "original_price": 429.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 275,
        "featured": True,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
        "calories": "550 kcal",
        "tags": ["Pure Veg", "Bestseller"]
    },
    {
        "name": "Slow-Simmered Dal Bukhara",
        "slug": "slow-simmered-dal-bukhara",
        "category": "Indian",
        "description": "Whole black urad lentils slow-cooked overnight for 18 hours on charcoal embers with fresh cream, unsalted butter, and mild Kashmiri spices.",
        "price": 299.0,
        "original_price": 349.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 190,
        "featured": False,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "15-20 mins",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        "calories": "410 kcal",
        "tags": ["Signature"]
    },
    {
        "name": "Kashmiri Mutton Rogan Josh",
        "slug": "kashmiri-mutton-rogan-josh",
        "category": "Indian",
        "description": "Fall-off-the-bone baby mutton cuts cooked in an aromatic fennel, ginger, and ratanjot-infused crimson curry according to royal Wazwan traditions.",
        "price": 549.0,
        "original_price": 619.0,
        "vegetarian": False,
        "rating": 4.8,
        "review_count": 160,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "30-35 mins",
        "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        "calories": "680 kcal",
        "tags": ["Royal Selection"]
    },

    # --- BIRYANI ---
    {
        "name": "Royal Hyderabadi Dum Chicken Biryani",
        "slug": "royal-hyderabadi-dum-chicken-biryani",
        "category": "Biryani",
        "description": "Tender spring chicken marinated in yogurt, brown onions (birista), fresh mint, and shahi garam masala, sealed in a handi with aged saffron basmati rice.",
        "price": 419.0,
        "original_price": 489.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 510,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "25-30 mins",
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        "calories": "740 kcal",
        "tags": ["Most Popular", "Dum Cooked"]
    },
    {
        "name": "Lucknowi Shahi Mutton Biryani",
        "slug": "lucknowi-shahi-mutton-biryani",
        "category": "Biryani",
        "description": "Awadhi style pakki biryani featuring gentle kewra fragrance, melt-in-mouth mutton cuts, and golden fried onions served with creamy burani raita.",
        "price": 549.0,
        "original_price": 629.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 230,
        "featured": True,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "30-35 mins",
        "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
        "calories": "820 kcal",
        "tags": ["Awadhi Special"]
    },
    {
        "name": "Zaffrani Subz Paneer Dum Biryani",
        "slug": "zaffrani-subz-paneer-dum-biryani",
        "category": "Biryani",
        "description": "Garden baby carrots, french beans, green peas, and marinated malai paneer layers enveloped in saffron-scented basmati rice with fried cashews.",
        "price": 349.0,
        "original_price": 399.0,
        "vegetarian": True,
        "rating": 4.7,
        "review_count": 182,
        "featured": False,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "20-25 mins",
        "image": "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=800&q=80",
        "calories": "590 kcal",
        "tags": ["Veg Dum Special"]
    },
    {
        "name": "Kathal (Jackfruit) Royal Biryani",
        "slug": "kathal-jackfruit-royal-biryani",
        "category": "Biryani",
        "description": "Tender baby jackfruit pan-seared with caramelized onions and whole spices, steamed together with scented aged rice for a rich vegetarian feast.",
        "price": 329.0,
        "original_price": 379.0,
        "vegetarian": True,
        "rating": 4.6,
        "review_count": 94,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "25 mins",
        "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        "calories": "510 kcal",
        "tags": ["Plant Based"]
    },

    # --- ASIAN ---
    {
        "name": "Bangkok Street Pad Thai Noodles",
        "slug": "bangkok-street-pad-thai-noodles",
        "category": "Asian",
        "description": "Wok-fried flat rice noodles tossed with tamarind reduction, crispy tofu, bean sprouts, crushed toasted peanuts, garlic chives, and fresh lime.",
        "price": 369.0,
        "original_price": 419.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 164,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "15-20 mins",
        "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
        "calories": "580 kcal",
        "tags": ["Wok Tossed"]
    },
    {
        "name": "Crispy Chili Garlic Dim Sum Platter",
        "slug": "crispy-chili-garlic-dim-sum-platter",
        "category": "Asian",
        "description": "Basket of 6 translucent steamed dumplings filled with water chestnuts, shiitake mushrooms, and bok choy, drizzled with fiery homemade Sichuan chili crisp.",
        "price": 329.0,
        "original_price": 379.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 118,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15 mins",
        "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
        "calories": "340 kcal",
        "tags": ["Handcrafted"]
    },
    {
        "name": "Tokyo Tonkotsu Ramen Bowl",
        "slug": "tokyo-tonkotsu-ramen-bowl",
        "category": "Asian",
        "description": "Rich 12-hour simmered savory broth with springy handmade ramen noodles, tender braised chicken chashu, ajitsuke tamago (marinated egg), menma, and nori sheets.",
        "price": 469.0,
        "original_price": 529.0,
        "vegetarian": False,
        "rating": 4.9,
        "review_count": 210,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "20 mins",
        "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
        "calories": "690 kcal",
        "tags": ["Comfort Food"]
    },
    {
        "name": "Szechuan Kung Pao Chicken",
        "slug": "szechuan-kung-pao-chicken",
        "category": "Asian",
        "description": "Tender diced chicken thighs stir-fried with fragrant Szechuan peppercorns, dried red chilies, crunchy roasted peanuts, and scallions in savory dark soy glaze.",
        "price": 399.0,
        "original_price": 459.0,
        "vegetarian": False,
        "rating": 4.7,
        "review_count": 140,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "18-22 mins",
        "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
        "calories": "560 kcal",
        "tags": ["Spicy Wok"]
    },

    # --- DESSERTS ---
    {
        "name": "Belgian Dark Chocolate Molten Lava Cake",
        "slug": "belgian-dark-chocolate-molten-lava-cake",
        "category": "Desserts",
        "description": "Warm 70% Callebaut dark chocolate sponge with a flowing molten core, dusted with French cocoa powder and accompanied by Madagascar vanilla drizzle.",
        "price": 249.0,
        "original_price": 299.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 310,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "15 mins",
        "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        "calories": "440 kcal",
        "tags": ["Indulgent", "Bestseller"]
    },
    {
        "name": "New York Baked Blueberry Cheesecake",
        "slug": "new-york-baked-blueberry-cheesecake",
        "category": "Desserts",
        "description": "Silky smooth Philadelphia cream cheese on a buttery graham cracker crust, topped with wild Canada blueberry compote.",
        "price": 289.0,
        "original_price": 339.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 175,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "10 mins",
        "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
        "calories": "490 kcal",
        "tags": ["Artisan Bakery"]
    },
    {
        "name": "Royal Shahi Kesar Pista Phirni",
        "slug": "royal-shahi-kesar-pista-phirni",
        "category": "Desserts",
        "description": "Slow-reduced creamy ground rice pudding infused with Kashmiri saffron, green cardamom, silver leaf (varq), and chopped Iranian pistachios served in an earthen clay matka.",
        "price": 199.0,
        "original_price": 239.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 130,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "10 mins",
        "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        "calories": "320 kcal",
        "tags": ["Royal Sweet"]
    },
    {
        "name": "Classic Italian Tiramisu Cup",
        "slug": "classic-italian-tiramisu-cup",
        "category": "Desserts",
        "description": "Espresso-soaked Savoiardi ladyfingers layered with whipped mascarpone zabaione and finished with bittersweet Dutch cocoa powder.",
        "price": 269.0,
        "original_price": 319.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 148,
        "featured": False,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "10 mins",
        "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        "calories": "380 kcal",
        "tags": ["Italian Dessert"]
    },

    # --- HEALTHY ---
    {
        "name": "California Avocado Quinoa Glow Bowl",
        "slug": "california-avocado-quinoa-glow-bowl",
        "category": "Healthy",
        "description": "Fluffy tricolor organic quinoa, hass avocado slices, edamame, roasted chickpeas, baby spinach, cucumber ribbons, and tahini-lemon dressing.",
        "price": 349.0,
        "original_price": 399.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 112,
        "featured": True,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15 mins",
        "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        "calories": "410 kcal",
        "tags": ["Superfood", "High Protein"]
    },
    {
        "name": "Teriyaki Tofu & Edamame Poke Bowl",
        "slug": "teriyaki-tofu-edamame-poke-bowl",
        "category": "Healthy",
        "description": "Pan-glazed organic firm tofu, steamed Japanese brown rice, pickled red radish, wakame seaweed salad, and toasted sesame vinaigrette.",
        "price": 329.0,
        "original_price": 379.0,
        "vegetarian": True,
        "rating": 4.7,
        "review_count": 89,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15-18 mins",
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        "calories": "430 kcal",
        "tags": ["Plant Powered"]
    },
    {
        "name": "Grilled Herb Chicken Caesar Bowl",
        "slug": "grilled-herb-chicken-caesar-bowl",
        "category": "Healthy",
        "description": "Tender rosemary grilled chicken breast, crisp romaine hearts, garlic sourdough crisps, shaved 24-month Parmigiano-Reggiano, and light yogurt Caesar dressing.",
        "price": 389.0,
        "original_price": 439.0,
        "vegetarian": False,
        "rating": 4.8,
        "review_count": 154,
        "featured": False,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "15-20 mins",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        "calories": "470 kcal",
        "tags": ["Low Carb", "High Protein"]
    },
    {
        "name": "Mediterranean Falafel Mezze Salad",
        "slug": "mediterranean-falafel-mezze-salad",
        "category": "Healthy",
        "description": "Crispy herb-crusted chickpea falafels, smoked eggplant babaganoush, kalamata olives, marinated feta, cherry tomatoes, and warm za'atar pita.",
        "price": 319.0,
        "original_price": 369.0,
        "vegetarian": True,
        "rating": 4.6,
        "review_count": 76,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "15 mins",
        "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80",
        "calories": "450 kcal",
        "tags": ["Mediterranean"]
    },

    # --- BEVERAGES ---
    {
        "name": "Alphonso Mango & Cardamom Lassi",
        "slug": "alphonso-mango-cardamom-lassi",
        "category": "Beverages",
        "description": "Rich artisanal yogurt churned with pure Ratnagiri Alphonso mango pulp, green cardamom, and sprinkled with slivered pistachios.",
        "price": 149.0,
        "original_price": 179.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 340,
        "featured": True,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "5 mins",
        "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
        "calories": "240 kcal",
        "tags": ["Refreshing", "Bestseller"]
    },
    {
        "name": "Cold Brew Vanilla Nitro",
        "slug": "cold-brew-vanilla-nitro",
        "category": "Beverages",
        "description": "16-hour steeped single-origin Arabica cold brew infused with pure Madagascar vanilla syrup and sweet cream cap.",
        "price": 199.0,
        "original_price": 239.0,
        "vegetarian": True,
        "rating": 4.8,
        "review_count": 180,
        "featured": False,
        "is_bestseller": True,
        "available": True,
        "preparation_time": "5 mins",
        "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
        "calories": "110 kcal",
        "tags": ["Caffeine Kick"]
    },
    {
        "name": "Sparkling Hibiscus Berry Refresher",
        "slug": "sparkling-hibiscus-berry-refresher",
        "category": "Beverages",
        "description": "Brewed organic crimson hibiscus flowers, muddled raspberries, fresh mint leaves, lime juice, and effervescent sparkling soda.",
        "price": 169.0,
        "original_price": 199.0,
        "vegetarian": True,
        "rating": 4.7,
        "review_count": 92,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "5 mins",
        "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        "calories": "85 kcal",
        "tags": ["Mocktail", "Zero Sugar Opt"]
    },
    {
        "name": "Artisanal Masala Cutting Chai Flask",
        "slug": "artisanal-masala-cutting-chai-flask",
        "category": "Beverages",
        "description": "Freshly brewed whole Assam CTC tea leaves boiled with crushed ginger, green cardamom, cinnamon, and whole cow milk. Delivered hot in an insulated flask.",
        "price": 129.0,
        "original_price": 159.0,
        "vegetarian": True,
        "rating": 4.9,
        "review_count": 290,
        "featured": False,
        "is_bestseller": False,
        "available": True,
        "preparation_time": "10 mins",
        "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        "calories": "140 kcal",
        "tags": ["Warm & Desi"]
    }
]

def seed_database():
    print(f"Connecting to MongoDB at: {MONGO_URI.split('@')[-1]}")
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        db = client[DB_NAME]
        # Verify connection
        client.admin.command('ping')
        print("MongoDB connection verified successfully.")

        # Seed categories
        print(f"Seeding {len(CATEGORIES)} categories...")
        for cat in CATEGORIES:
            db.categories.update_one(
                {"slug": cat["slug"]},
                {"$set": cat},
                upsert=True
            )
        print("Categories seeded successfully.")

        # Seed products
        print(f"Seeding {len(PRODUCTS)} products...")
        for prod in PRODUCTS:
            db.products.update_one(
                {"slug": prod["slug"]},
                {"$set": prod},
                upsert=True
            )
        print("Products seeded successfully.")

        total_cats = db.categories.count_documents({})
        total_prods = db.products.count_documents({})
        print(f"Done! Database '{DB_NAME}' now has {total_cats} categories and {total_prods} products.")

    except Exception as e:
        print(f"Error seeding database: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    seed_database()
