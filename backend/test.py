import requests

url = "http://127.0.0.1:8000/api/questions/generate"
files = {'file': open('temp.pdf', 'rb')}
data = {'difficulty': 'comprehension', 'number_of_questions': 10}

response = requests.post(url, files=files, data=data)
print(response.json())
