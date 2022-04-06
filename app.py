from flask import Flask, render_template, request, jsonify

from chat import get_response

from flask_cors import CORS

import os

app = Flask(__name__)
CORS(app)

@app.get('/')
def index_get():
    return "Hello"

@app.post('/predict')
def predict():
    key = request.get_json().get("key") 
    if key == os.environ.get('KEY'):
        text = request.get_json().get("message") 
        response = get_response(text)
        message = {"answer": response}
        return jsonify(message)
    else:
        return jsonify({"code":400,"answer": "Unauthorised access"})

if __name__ == "__main__":
    app.run(debug=True)