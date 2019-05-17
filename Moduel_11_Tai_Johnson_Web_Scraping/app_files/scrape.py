import pandas as pd
from splinter import Browser
import time


def init_browser():
    # function to initialize browser and define path to chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    #TODO define Mars data scrape

    # browser = init_browser()
    # listings = {}

    # url = "https://raleigh.craigslist.org/search/hhh?max_price=1500&availabilityMode=0"
    # browser.visit(url)

    # html = browser.html
    # soup = BeautifulSoup(html, "html.parser")

    # listings["headline"] = soup.find("a", class_="result-title").get_text()
    # listings["price"] = soup.find("span", class_="result-price").get_text()
    # listings["hood"] = soup.find("span", class_="result-hood").get_text()

    # return listings