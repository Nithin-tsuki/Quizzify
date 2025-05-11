import fitz  # PyMuPDF
import sys
import json
import requests
import io

# Force UTF-8 encoding for stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

GROQ_API_KEY = ""
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
        "Authorization": f"Bearer {GROQ_API_KEY}",
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

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {e}"}
    except ValueError:
        return {"error": "Invalid JSON returned by Groq API."}

def main():
    try:
        file_path = sys.argv[1]
        start_page = int(sys.argv[2])
        end_page = int(sys.argv[3])
        num_questions = int(sys.argv[4])

        extracted_text = extract_text_from_pdf(file_path, start_page, end_page)
        prompt = f"Generate {num_questions} exam-style questions from the following content:\n\n{extracted_text[:3000]}"

        result = query_groq(prompt)

        if "error" in result:
            print(json.dumps({"error": result["error"]}))
            return

        try:
            questions = result['choices'][0]['message']['content'].strip().split("\n")
            questions = [q.strip() for q in questions if q.strip()]
            print(json.dumps({"questions": questions}))
        except Exception:
            print(json.dumps({"error": "Error extracting questions from Groq response."}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
