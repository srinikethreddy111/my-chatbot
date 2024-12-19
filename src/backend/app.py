from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import logging

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

logging.basicConfig(level=logging.DEBUG) 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(*args, **kwargs)
    return decorated

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user and check_password_hash(user.password, data['password']):
            token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, app.config['SECRET_KEY'], algorithm="HS256")
            logging.debug(f"Token generated: {token}")
            return jsonify({'token': token})
        else:
            return jsonify({'message': 'Invalid credentials!'}), 401
    except Exception as e:
        logging.error(f"Error during login: {str(e)}")
        return jsonify({'message': 'An error occurred'}), 500

@app.route('/api/products', methods=['GET'])
@token_required
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'category': p.category, 'price': p.price, 'stock': p.stock} for p in products])

@app.route('/api/initial-message', methods=['GET'])
def get_initial_message():
    return jsonify({"initial_message": "Iam Your ChatBot, How may i help you?"})

@app.route('/api/chat', methods=['POST'])
def chat():
    message = request.json['message']
    return jsonify({'text': f"You said: {message}"})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
