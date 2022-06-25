from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import dashboard_scrape

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def index():

    # Find one record of data from the mongo database
    dashboard_info = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", dashboard=dashboard_info)


@app.route("/")
def table():
    return render_template("table.html")

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    dashboard_info = dashboard_scrape.scrape()
    print(f'scrape results are {dashboard_info}')

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update_one({}, {"$set": dashboard_info}, upsert=True)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)