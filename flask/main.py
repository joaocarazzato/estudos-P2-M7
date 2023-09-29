from flask import Flask, request, jsonify
from table_creation import create_table
from table_creation import Results
from table_creation import db as db
import json

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

db.init_app(app)
create_table(app)

@app.route("/")
def hello_world():
    return "<p>Hello World</p>"

@app.route("/sum", methods=["POST"])
def sum_request():
    data = request.form
    print(data)
    resultado = int(data['nome']) + int(data['email'])
    response = jsonify({'teste': resultado})
    new_result = Results(resultado=resultado)
    db.session.add(new_result)
    db.session.commit()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/results", methods=["GET"])
def results():
    data_query = Results.query.all()
    print(data_query)
    print(data_query[0].resultado)
    all_results = []
    for dado in data_query:
        all_results.append(dado.resultado)
        print(all_results)
    response = jsonify({'results': all_results})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

app.run(debug=True, host='0.0.0.0')