from flask import Flask, jsonify, render_template
import json

app = Flask(__name__, static_url_path='/static', static_folder='static')

# pull data from .json
with open('data/author_title.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file)

@app.route("/")
def welcome():
  """List all available api routes."""
  return (
    f"Available Routes:<br/>"
    f"/heatmap<br/>"
    f"/api/data<br/>"
    f"/api/coordinates<br/>"
  )

# heatmap page
@app.route("/heatmap")
def heatmap():
    return render_template('heatmap.html')

@app.route('/api/coordinates')
# @app.route('/api/data', methods=['GET'])
def coordinates():
    # Read and return the JSON data from coordinates.json
    with open('static/coordinates.json', 'r', encoding='utf-8') as file:
        coordinates_data = json.load(file)
    return jsonify(coordinates_data)

@app.route('/api/data')
# @app.route('/api/data', methods=['GET'])
def get_data():
    # return the json data
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
