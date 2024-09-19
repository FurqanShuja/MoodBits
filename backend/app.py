from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
import cohere

# Initialize Flask, Bcrypt, and CORS
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# MongoDB connection (update with your MongoDB URI)
uri = "mongodb+srv://user:user@cluster0.pjfqplt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Define your database and collection
db = client.moodbits_db  # Name of your database
users_collection = db.users  # Users collection

# Register route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Check if user already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'User already exists'}), 400

    # Hash the password and store the user
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one({'email': email, 'password': hashed_password})

    return jsonify({'message': 'User registered successfully'}), 201

# Login route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Find the user in the database
    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    # Check password
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({'message': 'Login successful', 'email': email}), 200

@app.route('/api/train_model', methods=['POST'])
def train_model():
    try:
        data = request.get_json()  # Retrieve the JSON from the request
        print(data)  # Debug: Print the received data

        email = data.get('email')
        emotions = data.get('emotions')

        print(email)

        # Ensure email and emotions are provided
        if not email or not emotions:
            return jsonify({'error': 'Email and emotions are required'}), 400

        # Validate the emotions field
        if not isinstance(emotions, list):
            return jsonify({'error': 'Emotions must be a list'}), 400
        
        if len(emotions) != 10:
            return jsonify({'error': 'Emotions list must contain exactly 10 entries'}), 400

        if not all(isinstance(e, int) and 1 <= e <= 5 for e in emotions):
            return jsonify({'error': 'Each emotion must be an integer between 1 and 5'}), 400

        # Create the document to insert into MongoDB
        training_data = {
            'email': email,
            'emotions': emotions  # Save the list of numeric emotions associated with images
        }

        # Insert or update the user's training data in MongoDB
        users_collection.update_one(
            {'email': email},  # Find the user by email
            {'$set': {'training_data': training_data}},  # Insert or update their training data
            upsert=True  # Insert the document if it doesn't exist
        )

        return jsonify({'message': 'Training data saved successfully'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f'An error occurred: {e}'}), 500

# Initialize Cohere with your API key
COHERE_API_KEY = 'SiByyJ2ng3iMRr5Sk2fKsZUDOEb2b2cJRX6DpbUo'  # Replace with your actual Cohere API key
co = cohere.Client(COHERE_API_KEY)

@app.route('/api/generate_mantra', methods=['POST'])
def generate_mantra():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        # Generate a mantra using Cohere's generate endpoint
        response = co.generate(
            model='command-xlarge-nightly',  # Choose your Cohere model
            prompt='Generate a mantra for self-improvement and mindfulness in one sentence',
            max_tokens=50  # Set the token limit for the mantra generation
        )

        # Extract the generated mantra from the response
        mantra = response.generations[0].text.strip()

        return jsonify({'mantra': mantra}), 200

    except Exception as e:
        print(f"Error generating mantra: {e}")
        return jsonify({'error': f'An error occurred: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
