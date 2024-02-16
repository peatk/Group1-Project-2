from flask import Flask, jsonify, render_template
import json

app = Flask(__name__, static_url_path='/static', static_folder='static')


@app.route("/")
def welcome():
  """List all available api routes."""
  return (
    f"Available Routes:<br/>"
    f"/barchart<br/>"
    f"/heatmap<br/>"
    f"/api/data<br/>"
    f"/api/authors<br/>"
    f"/api/coordinates<br/>"
  )

# barchart page
@app.route("/barchart")
def barchart():
    return render_template('barchart.html')

# heatmap page
@app.route("/heatmap")
def heatmap():
    return render_template('heatmap.html')

# state map page
@app.route("/statemap")
def statemap():
    return render_template('statemap.html')

@app.route('/api/authors')
# @app.route('/api/data', methods=['GET'])
def authors_title():
    # Read and return the JSON data from coordinates.json
    with open('static/author_title.json', 'r', encoding='utf-8') as file:
        authors_data = json.load(file)
    return jsonify(authors_data)

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
    with open('data/author_title.json', 'r', encoding='utf-8') as file:
        json_data = json.load(file)
    # return the json data
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
