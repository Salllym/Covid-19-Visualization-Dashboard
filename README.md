# Road Tripping Accross the United States

Group 6 Members: Sally Mei, Debolina Bhaumik, Cole Barnes, Kanu Madhok

## Topic Overview
Summer vacation time is here, but covid is still around. Trying to plan a road trip across the United States while keeping everyone’s health in 
mind can be tricky. Using the Covid Dashboard, users can easily identify which areas to avoid. 

## Datasets
[WHO_Covid19_Global_Data](https://covid19.who.int/data)

[covid_cases](https://covid.cdc.gov/covid-data-tracker/#cases_casesper100klast7days)

[covid_vaccine](https://covid.cdc.gov/covid-data-tracker/#vaccinations_vacc-total-admin-rate-total)

[states_lat_long](https://developers.google.com/public-data/docs/canonical/states_csv)

## Data Cleaning/Manipulation & Conversion
Pandas was used for data cleaning/ manipulation and conversion. 

Certain columns were selected from the [covid_cases](Resources/covid_cases.csv) and [covid_vaccine](Resources/covid_vaccine.csv) files to be placed into 2 separate dataframes. Then those 2 dataframes were merged with the [states_lat_long](Resources/states_lat_long.csv) file on the "State/Territory" column and saved as csv files.

cleaned & merged covid_case dataframe:
![covid_case](Images/covid_case.PNG)

cleaned & merged covid_vaccine dataframe:
![covid_vaccine](Images/covid_vaccine.PNG)

The [WHO_Covid19_Global_Data](Resources/WHO_COVID19_Global_Data.csv) file was extracted into a dataframe and the data was saved as a html file after setting the "name" column as the index.

WHO_Covid19_Global_Data dataframe:
![global_data](Images/global_data.PNG)

