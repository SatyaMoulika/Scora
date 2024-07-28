import requests
import json
from pdfminer.high_level import extract_text
import openai

API_KEY = "69V5Yovw3PDlqO2zsi2uzXtRIAYHMBN0Y2XMoaRTGoBda2zm" 

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
            "content": f"Given the following text, generate {number_of_questions} questions for" 
                       f" a {difficulty} level exam. Text: {text}. Return the response in JSON format where" 
                       f" all the questions are values of a single key named 'questions'."
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
        return response_data['choices'][0]['message']['content']
    else:
        raise Exception(f"Request failed with status code {response.status_code}: {response.text}")


def generate_questions(pdf_content, difficulty, number_of_questions):
    text = extract_text_from_pdf(pdf_content)
    questions = generate_questions_from_text(text, difficulty, number_of_questions)
    return questions.split('\n')

# import requests
# import json
# from pdfminer.high_level import extract_text

# API_KEY = "69V5Yovw3PDlqO2zsi2uzXtRIAYHMBN0Y2XMoaRTGoBda2zm" 

# def extract_text_from_pdf(pdf_content):
#     with open("temp.pdf", "wb") as f:
#         f.write(pdf_content)
#     text = extract_text("temp.pdf", maxpages=50)
#     return text

# def generate_questions_from_text(text, difficulty, number_of_questions):
#     url = "https://api.fireworks.ai/inference/v1/chat/completions"
#     payload = {
#         "model": "accounts/fireworks/models/mixtral-8x22b-instruct",
#         "max_tokens": 50000,
#         "top_p": 1,
#         "top_k": 40,
#         "presence_penalty": 0,
#         "frequency_penalty": 0,
#         "temperature": 0.6,
#         "messages": [{
#             "role": "USER",
#             "content": f"Given the following text, generate {number_of_questions} questions for" 
#                        f" a {difficulty} level exam. Text: {text}. Return the response in JSON format where" 
#                        f" all the questions are values of a single key named 'questions'."
#         }]
#     }
#     headers = {
#         "Accept": "application/json",
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {API_KEY}"
#     }

#     response = requests.post(url, headers=headers, data=json.dumps(payload))

#     if response.status_code == 200:
#         response_data = response.json()
#         questions = response_data['choices'][0]['message']['content']
#         return json.loads(questions)['questions']
#     else:
#         raise Exception(f"Request failed with status code {response.status_code}: {response.text}")
    

# def generate_questions(pdf_content, difficulty, number_of_questions):
#     text = extract_text_from_pdf(pdf_content)
#     questions = generate_questions_from_text(text, difficulty, number_of_questions)
#     return questions.split('\n')

