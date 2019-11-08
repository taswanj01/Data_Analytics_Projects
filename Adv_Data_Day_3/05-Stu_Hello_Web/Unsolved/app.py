# 1. import Flask
from flask import Flask

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route
@app.route("/")
def index_route():
    print("Server received request for 'index' page...")
    return "Welcome to my API!"


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "My name is Tai and I live in longmont"

@app.route("/contact")
def contact():
    print("Server received request for the 'contact' page...")
    return "You can email me at taswanjohnson78@gmail.com"


if __name__ == "__main__":
    app.run(debug=True)