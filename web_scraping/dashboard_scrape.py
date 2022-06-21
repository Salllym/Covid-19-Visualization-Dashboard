# Import packages and dependencies
from splinter import Browser
import time
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager

def scrape():

    # Setup Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    # URL to scrape
    url = "https://covid.cdc.gov/covid-data-tracker/#cases_casesper100klast7days"

    # Call visit on our browser and pass in the URL we want to scrape   
    browser.visit(url)

    # Let it sleep for 1 second
    time.sleep(1)

    # Return all the HTML on our page
    html = browser.html
        
    # Create a Beautiful Soup object, pass in our HTML, and call 'html.parser'
    soup = BeautifulSoup(html, "html.parser")

    # Quit the browser
    browser.quit()

    # Pulls appropriate section of HTML
    temp = soup.find("div", {"id": "card_001"})

    # Stores the total number of cases and formats it
    total_cases = temp.find("div", class_="card-number").get_text()
    total_cases = total_cases.replace("\n", "").replace(" ", "")
    total_cases = total_cases.split("+")
    total_cases = total_cases[0]

    # Stores the number of new cases and formats it
    new_cases = temp.find("div", class_="card-recent").get_text()
    new_cases = new_cases.strip()

    # Pulls appropriate section of HTML
    temp = soup.find("div", {"id": "card_002"})

    # Stores 7 day case rate per 100,000 and formats it
    seven_day_case_rate_per_100000 = temp.find("div", class_="card-number").get_text()
    seven_day_case_rate_per_100000 = seven_day_case_rate_per_100000.replace("\n", "").replace(" ", "")

    # Pulls appropriate section of HTML
    temp = soup.find("div", {"id": "card_003"})

    # Stores total deaths and formats it
    total_deaths = temp.find("div", class_="card-number").get_text()
    total_deaths = total_deaths.replace("\n", "").replace(" ", "")
    total_deaths = total_deaths.split("+")
    total_deaths = total_deaths[0]

    # Stores new deaths and formats it
    new_deaths = temp.find("div", class_="card-recent").get_text()
    new_deaths = new_deaths.strip()

    # Setup Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    # URL to scrape
    url = "https://covid.cdc.gov/covid-data-tracker/#vaccinations_vacc-total-admin-rate-total"

    # Call visit on our browser and pass in the URL we want to scrape   
    browser.visit(url)

    # Let it sleep for 1 second
    time.sleep(1)

    # Return all the HTML on our page
    html = browser.html
        
    # Create a Beautiful Soup object, pass in our HTML, and call 'html.parser'
    soup = BeautifulSoup(html, "html.parser")

    # Quit the browser
    browser.quit()

    # Pulls appropriate section of HTML
    temp = soup.find("div", class_="card-wrapper")

    # Stores total doses distributed and formats it
    total_doses_distributed = temp.find("div", class_="justify-content-center").get_text()
    total_doses_distributed = total_doses_distributed.replace("\n", "").replace(" ", "")

    # Stores total doses administered and formats it
    total_doses_administered = temp.find("div", class_="inner-content").get_text()
    total_doses_administered = total_doses_administered.replace("\n", "").replace(" ", "")

    # Pulls appropriate section of HTML
    temp = soup.find("div", class_="card-content")

    # Grabs the number of people fully vaccinated in millions
    people_vaccinated_millions = temp.find("h1").get_text()

    # Pulls appropriate section of HTML
    temp = soup.find("div", {"data-tab": "atLeastOne"})

    # Filtering down the HTML
    rows = temp.find_all("div", class_="row w-100 pl-1 pr-1")

    # Filtering down the HTML
    total = rows[0].find_all("div", class_="card-number")

    # Stores and formats total people with at least one dose
    atleast_one_dose_total = total[0].get_text()
    atleast_one_dose_total = atleast_one_dose_total.replace("\n", "").replace(" ", "")

    # Stores and formats total people with at least one dose by percentage
    atleast_one_dose_total_percent = total[1].get_text()
    atleast_one_dose_total_percent = atleast_one_dose_total_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[1].find_all("div", class_="card-number")

    # Stores and formats people older than 5 with at least one dose
    atleast_one_dose_greater_5 = total[0].get_text()
    atleast_one_dose_greater_5 = atleast_one_dose_greater_5.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 5 with at least one dose by percentage
    atleast_one_dose_greater_5_percent = total[1].get_text()
    atleast_one_dose_greater_5_percent = atleast_one_dose_greater_5_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[2].find_all("div", class_="card-number")

    # Stores and formats people older than 12 with at least one dose
    atleast_one_dose_greater_12 = total[0].get_text()
    atleast_one_dose_greater_12 = atleast_one_dose_greater_12.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 12 with at least one dose by percentage
    atleast_one_dose_greater_12_percent = total[1].get_text()
    atleast_one_dose_greater_12_percent = atleast_one_dose_greater_12_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[3].find_all("div", class_="card-number")

    # Stores and formats people older than 18 with at least one dose
    atleast_one_dose_greater_18 = total[0].get_text()
    atleast_one_dose_greater_18 = atleast_one_dose_greater_18.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 18 with at least one dose by percentage
    atleast_one_dose_greater_18_percent = total[1].get_text()
    atleast_one_dose_greater_18_percent = atleast_one_dose_greater_18_percent.replace("\n", "").replace(" ", "")

    # 65+ has a different class
    row_65 = temp.find("div", class_="row w-10 pl-1 pr-1")

    # Filtering down the HTML
    total = row_65.find_all("div", class_="card-number")

    # Stores and formats people older than 65 with at least one dose
    atleast_one_dose_greater_65 = total[0].get_text()
    atleast_one_dose_greater_65 = atleast_one_dose_greater_65.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 65 with at least one dose by percentage
    atleast_one_dose_greater_65_percent = total[1].get_text()
    atleast_one_dose_greater_65_percent = atleast_one_dose_greater_65_percent.replace("\n", "").replace(" ", "")

    # Storing results for atleast one dose vaccination info in a dictionary
    atleast_one_dose = {
        "Count": [atleast_one_dose_total, atleast_one_dose_greater_5, atleast_one_dose_greater_12, 
                atleast_one_dose_greater_18, atleast_one_dose_greater_65],
        "Percent of US population": [atleast_one_dose_total_percent, atleast_one_dose_greater_5_percent, 
                                    atleast_one_dose_greater_12_percent, atleast_one_dose_greater_18_percent, 
                                    atleast_one_dose_greater_65_percent]
    }

    # Pulls appropriate section of HTML
    temp = soup.find("div", {"data-tab": "fullyVaccinated"})

    # Filtering down the HTML
    rows = temp.find_all("div", class_="row w-100 pl-1 pr-1")

    # Filtering down the HTML
    total = rows[0].find_all("div", class_="card-number")

    # Stores and formats total people fully vaccinated
    fully_vaccinated_total = total[0].get_text()
    fully_vaccinated_total = fully_vaccinated_total.replace("\n", "").replace(" ", "")

    # Stores and formats total people fully vaccinated by percentage
    fully_vaccinated_total_percent = total[1].get_text()
    fully_vaccinated_total_percent = fully_vaccinated_total_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[1].find_all("div", class_="card-number")

    # Stores and formats people older than 5 fully vaccinated
    fully_vaccinated_greater_5 = total[0].get_text()
    fully_vaccinated_greater_5 = fully_vaccinated_greater_5.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 5 fully vaccinated by percentage
    fully_vaccinated_greater_5_percent = total[1].get_text()
    fully_vaccinated_greater_5_percent = fully_vaccinated_greater_5_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[2].find_all("div", class_="card-number")

    # Stores and formats people older than 12 fully vaccinated
    fully_vaccinated_greater_12 = total[0].get_text()
    fully_vaccinated_greater_12 = fully_vaccinated_greater_12.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 12 fully vaccinated by percentage
    fully_vaccinated_greater_12_percent = total[1].get_text()
    fully_vaccinated_greater_12_percent = fully_vaccinated_greater_12_percent.replace("\n", "").replace(" ", "")

    # Filtering down the HTML
    total = rows[3].find_all("div", class_="card-number")

    # Stores and formats people older than 18 fully vaccinated
    fully_vaccinated_greater_18 = total[0].get_text()
    fully_vaccinated_greater_18 = fully_vaccinated_greater_18.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 18 fully vaccinated by percentage
    fully_vaccinated_greater_18_percent = total[1].get_text()
    fully_vaccinated_greater_18_percent = fully_vaccinated_greater_18_percent.replace("\n", "").replace(" ", "")

    # 65+ has a different class
    row_65 = temp.find("div", class_="row w-10 pl-1 pr-1")

    # Filtering down the HTML
    total = row_65.find_all("div", class_="card-number")

    # Stores and formats people older than 65 fully vaccinated
    fully_vaccinated_greater_65 = total[0].get_text()
    fully_vaccinated_greater_65 = fully_vaccinated_greater_65.replace("\n", "").replace(" ", "")

    # Stores and formats people older than 65 fully vaccinated by percentage
    fully_vaccinated_greater_65_percent = total[1].get_text()
    fully_vaccinated_greater_65_percent = fully_vaccinated_greater_65_percent.replace("\n", "").replace(" ", "")

    # Storing results for full vaccination info in a dictionary
    fully_vaccinated = {
        "Count": [fully_vaccinated_total, fully_vaccinated_greater_5, fully_vaccinated_greater_12, 
                fully_vaccinated_greater_18, fully_vaccinated_greater_65],
        "Percent of US population": [fully_vaccinated_total_percent, fully_vaccinated_greater_5_percent, 
                                    fully_vaccinated_greater_12_percent, fully_vaccinated_greater_18_percent, 
                                    fully_vaccinated_greater_65_percent]
    }

    # Set up list to hold all the info scrapped
    dashboard_info = [
        total_cases,
        new_cases,
        total_deaths,
        new_deaths,
        total_doses_distributed,
        total_doses_administered,
        people_vaccinated_millions,
        atleast_one_dose,
        fully_vaccinated 
    ]

    # Return the array of info
    return(dashboard_info)
