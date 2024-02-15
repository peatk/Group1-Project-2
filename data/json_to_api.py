from flask import Flask, jsonify
import json

app = Flask(__name__)

# pull data from .json
with open('author_title.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file)

@app.route("/")
def welcome():
  """List all available api routes."""
  return (
    f"Available Routes:<br/>"
    f"/api/data<br/>"
  )

@app.route('/api/data')
# @app.route('/api/data', methods=['GET'])
def get_data():
    # return the json data
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
