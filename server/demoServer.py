from flask import Flask, send_file
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route('/')
def home():
    return app.send_static_file('index.html')

count = 0

@app.route('/get-data')
def data():
    global count
    csv_dir = "./static"
    csv_file = "test-temperatures-" + str(count % 5) + ".csv"
    count += 1
    csv_path = os.path.join(csv_dir, csv_file)

    if not os.path.isfile(csv_path):
        return "ERROR: file % was not found on the server" % csv_file

    data = pd.read_csv(csv_path)
    data.to_json("static\\new_data.json", orient='records')
    return send_file("static\\new_data.json")

if __name__ == '__main__':
    app.run()