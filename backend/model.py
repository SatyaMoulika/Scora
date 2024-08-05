import requests
import json
from pdfminer.high_level import extract_text
import openai

API_KEY = "RCeTlHtsBYOAra8q1M88rRhJsKqQcqjf6vkfOgXDBcJ6WsyN" 

def extract_text_from_pdf(pdf_content):
    with open("temp.pdf", "wb") as f:
        f.write(pdf_content)
    text = extract_text("temp.pdf", maxpages=50)
    return text

def generate_questions_from_text(text, difficulty, number_of_questions):
    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    payload = {
        "model": "accounts/fireworks/models/mixtral-8x22b-instruct",
        "max_tokens": 50000,
        "top_p": 1,
        "top_k": 40,
        "presence_penalty": 0,
        "frequency_penalty": 0,
        "temperature": 0.6,
        "messages": [{
            "role": "USER",
            "content": (
                f"Given the following text, generate {number_of_questions} questions based on "
                f"{difficulty} of Bloom's taxonomy. Text: {text}. Return the response in JSON format like below:\n"
                '{\n'
                '    "questions": [\n'
                '        "question_1",\n'
                '        "question_2",\n'
                '        ...\n'
                '    ]\n'
                '}'
            )
        }]
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }

    response = requests.post(url, headers=headers, data=json.dumps(payload))

    if response.status_code == 200:
        response_data = response.json()
        nested_json_string = response_data['choices'][0]['message']['content']
        nested_json = json.loads(nested_json_string)
        questions = nested_json["questions"]
        return questions
    else:
        raise Exception(f"Request failed with status code {response.status_code}: {response.text}")

def generate_questions(pdf_content, difficulty, number_of_questions):
    text = extract_text_from_pdf(pdf_content)
    questions = generate_questions_from_text(text, difficulty, number_of_questions)
    return questions
