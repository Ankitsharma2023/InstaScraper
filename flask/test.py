import requests
url ="http://127.0.0.1:5000/get_reels?username=vishhhhhh_21"
response = requests.get(url)    
print(response.content)