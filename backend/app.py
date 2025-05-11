# from flask import Flask, request, jsonify
# import fitz  # PyMuPDF
# import requests

# app = Flask(__name__)

# GROQ_API_KEY = "your_actual_api_key"
# GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
# MODEL_NAME = "llama3-8b-8192"

# def extract_text_from_pdf(file_path, start_page, end_page):
#     doc = fitz.open(file_path)
#     text = ""
#     for page_num in range(start_page - 1, end_page):
#         if page_num < len(doc):
#             text += doc.load_page(page_num).get_text()
#     return text.strip()

# def query_groq(prompt):
#     headers = {
#         "Authorization": f"Bearer {GROQ_API_KEY}",
#         "Content-Type": "application/json"
#     }
#     data = {
#         "model": MODEL_NAME,
#         "messages": [
#             {"role": "system", "content": "You are an AI that generates exam-style questions from the given text."},
#             {"role": "user", "content": prompt}
#         ],
#         "temperature": 0.7 
#     }
#     response = requests.post(GROQ_API_URL, headers=headers, json=data)
#     return response.json()

# @app.route("/generate-questions", methods=["POST"])
# def generate_questions():
#     data = request.json
#     file_path = data["filePath"]
#     start_page = data["startPage"]
#     end_page = data["endPage"]

#     try:
#         extracted_text = extract_text_from_pdf(file_path, start_page, end_page)
#         if not extracted_text:
#             return jsonify({"error": "No text found in PDF"}), 400
#         prompt = f"Generate 15 exam-style questions from the following content:\n\n{extracted_text[:3000]}"
#         result = query_groq(prompt)
#         questions = result["choices"][0]["message"]["content"]
#         return jsonify({"questions": questions})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5000)
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import requests

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

GROQ_API_KEY = "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"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME = "llama3-8b-8192"

def extract_text_from_pdf(file_path, start_page, end_page):
    doc = fitz.open(file_path)
    text = ""
    for page_num in range(start_page - 1, end_page):
        if page_num < len(doc):
            text += doc.load_page(page_num).get_text()
    return text.strip()

def query_groq(prompt):
    headers = {
        "Authorization": f"Bearer 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",
        "Content-Type": "application/json"
    }
    data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an AI that generates exam-style questions from the given text."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7 
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    return response.json()

@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    try:
        # Get PDF from form
        file = request.files['pdf']
        start_page = int(request.form['start_page'])
        end_page = int(request.form['end_page'])
        num_questions = int(request.form['num_questions'])

        # Save to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            file.save(tmp.name)
            extracted_text = extract_text_from_pdf(tmp.name, start_page, end_page)

        if not extracted_text:
            return jsonify({"error": "No text found in PDF"}), 400

        prompt = f"Generate {num_questions} exam-style questions from the following content:\n\n{extracted_text[:3000]}"
        result = query_groq(prompt)
        questions_text = result["choices"][0]["message"]["content"]
        questions_list = questions_text.strip().split("\n")
        
        return jsonify({"questions": questions_list})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
