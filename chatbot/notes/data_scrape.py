import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape(url: str):
    response = requests.get(url)
    data = response.content
    soup = BeautifulSoup(data, "html.parser")
    text = soup.get_text()
    return text

df = pd.read_excel("input.xlsx")

for index, row in df.iterrows():
    # create file from file ID
    file_name = f"{row['URL_ID']}.txt"
    url_name = f"{row['URL']}"

    # scrape data
    data = scrape(url_name)
    with open(file_name, 'w', encoding='utf-8', errors='ignore') as file:
        file.write(data)