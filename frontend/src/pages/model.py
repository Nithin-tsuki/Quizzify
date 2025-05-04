from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    data = request.get_json()
    content = data.get("content", "")
    # your_model.generate() logic goes here
    questions = your_model.generate(content)
    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(debug=True)
