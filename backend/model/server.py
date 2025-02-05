import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to enable cross-origin requests
from profanity_detector import ProfanityDetector  # Import the ProfanityDetector class

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

# Load the saved model
model_path = os.path.join("..", "Model", "profanity_detector.pkl")  # Adjust path to the Model folder
with open(model_path, 'rb') as f:
    model_data = pickle.load(f)

# Initialize the ProfanityDetector with loaded parameters
detector = ProfanityDetector(similarity_threshold=model_data['similarity_threshold'])
detector.bad_words = model_data['bad_words']
detector.vectorizer = model_data['vectorizer']

# Define a route for detecting profanity in a message
@app.route('/check_message', methods=['POST'])
def check_message():
    data = request.get_json()
    message = data.get('message', '')

    if detector(message):  # Calls the ProfanityDetector's __call__ method
        response = {"status": "True", "message": "No profanity detected."}
    else:
        response = {"status": "False", "message": "Profanity detected in message."}

    return jsonify(response)

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)