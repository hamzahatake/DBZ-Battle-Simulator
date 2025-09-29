import requests
import json

response = requests.get('http://localhost:8000/api/characters/')
data = response.json()
chars = data['results'] if 'results' in data else data

print('All characters:')
for i, char in enumerate(chars):
    print(f'{i+1}. {char["name"]} - Profile: {char.get("profile_image_url", "None")} - Full body: {char.get("full_body_image_url", "None")}')
