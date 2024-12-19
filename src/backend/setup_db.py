from app import db, User, Product
from werkzeug.security import generate_password_hash

db.drop_all()
db.create_all()

users = [
    User(username="user1", password=generate_password_hash("password1")),
    User(username="user2", password=generate_password_hash("password2")),
]

products = [
    Product(name="Smart Watch", category="Electronics", price=199.99, stock=50),
    Product(name="Novel XYZ", category="Books", price=15.99, stock=100),
    Product(name="Cotton Shirt", category="Textiles", price=25.50, stock=200),
    Product(name="Bluetooth Headphones", category="Electronics", price=59.99, stock=80),
    Product(name="Laptop Bag", category="Accessories", price=45.00, stock=120),
    Product(name="Yoga Mat", category="Fitness", price=20.00, stock=150),
    Product(name="Running Shoes", category="Footwear", price=120.00, stock=75),
    Product(name="Backpack", category="Accessories", price=80.00, stock=100),
    Product(name="Cookware Set", category="Kitchen", price=200.00, stock=30),
    Product(name="Desk Lamp", category="Home Decor", price=35.00, stock=90),
]

db.session.add_all(users)
db.session.add_all(products)
db.session.commit()

print("Database setup complete with mock data!")
