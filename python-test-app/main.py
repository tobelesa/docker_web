import requests

response = requests.get('nodejs-backend:3000')

if response.text == 'Hello, World!':
    print('it works')
else:
    print('Error: Unexpected response : ' + response.text)