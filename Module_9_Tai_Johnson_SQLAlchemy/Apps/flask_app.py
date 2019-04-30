# 1. import Flask
from flask import Flask, jsonify

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Here are the routes that are available\n" \
            ""

# 4. Define our routes and display user their options

@app.route("/api/v1.0/precipitation")
# Convert the query results to a Dictionary using date as the key and prcp as the value.
# Return the JSON representation of your dictionary.

def precipitation():
    


@app.route("/api/v1.0/stations")
# Return a JSON list of stations from the dataset.

def stations():
    


@app.route("/api/v1.0/tobs")
# query for the dates and temperature observations from a year from the last data point.
# Return a JSON list of Temperature Observations (tobs) for the previous year.

def tobs():


# Return a JSON list of the minimum temperature, the average temperature, 
# and the max temperature for a given start or start-end range.

@app.route("/api/v1.0/<start>")
# When given the start only, calculate TMIN, TAVG, and TMAX for 
# all dates greater than and equal to the start date.

def start(start):
    

@app.route("/api/v1.0/<start>/<end>")
# When given the start and the end date, 
# calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive.

def end(start,end):
    


if __name__ == "__main__":
    app.run(debug=True)
