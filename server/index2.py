from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask import jsonify, request
from flask_jwt_extended import (JWTManager, jwt_required, jwt_optional, create_access_token, get_jwt_identity, get_jwt_claims)
from pymongo import MongoClient


client = MongoClient('localhost',27017)

db = client["ootw"]
collection = db["user"]
print(collection.find())

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secrete'
jwt = JWTManager(app)


@app.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return -1
    
    username = request.json.get('username',None)
    password = request.json.get('password',None)

    if(collection.find_one({'id':username})):
            return -1
    else:
        collection.insert_one({'id':username, 'pw':password})
        return 1

if __name__ == '__main__':
    app.run(debug=True)