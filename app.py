#  Dependencies 
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
#import dashboard_scrape
import json

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_app")

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return render_template('index.html')

    # Redirect back to home page
    #return redirect("/")

@app.route("/cleaned_covid_case/geoJSON")
def covid_geoJSON():
    with open("./static/data/cleaned_covid_case.geojson") as file:
        json_decoded = json.load(file)
    
    return json_decoded

@app.route("/cleaned_covid_vaccine/geoJSON")
def vaccine_geoJSON():
    with open("./static/data/cleaned_covid_vaccine.geojson") as file:
        json_decoded = json.load(file)
    
    return json_decoded

@app.route("/state_boundaries/geoJSON")
def state_geoJSON():
    with open("./static/data/state_boundaries.geojson") as file:
        json_decoded = json.load(file)
    
    return json_decoded

# Add a new route
@app.route("/Global_Covid19_Data")
def Global_Covid19_Data():

    return render_template("Global_Covid19_Data.html")





if __name__ == '__main__':
    app.run(debug=True)
