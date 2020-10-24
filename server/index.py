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
api = Api(app)
app.config['JWT_SECRET_KEY'] = 'super-secrete'
jwt = JWTManager(app)


class SignUp(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        args = parser.parse_args()
        userID = args['id']
        userPW = args['pw']
        if(collection.find_one({'id':userID})):
            return -1
        else:
            collection.insert_one({'id':userID, 'pw':userPW})
            return 1

class SignIn(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        args = parser.parse_args()
        userID = args['id']
        userPW = args['pw']
        if(not collection.find_one({'id':userID, 'pw':userPW})):
            return -1
        else:
            access_token = create_access_token(identity=userID)
            return jsonify(access_token=access_token)
        return 1

class AddData(Resource):
    def post(self):
        return 1

class GetData(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('date', type=int, action="append")
        parser.add_argument('data', type=int)
        args = parser.parse_args()
        return 1

class UpdateData(Resource):
    def post(self):
        return 1
 
api.add_resource(SignUp, '/signup')
api.add_resource(SignIn, '/signin')

api.add_resource(AddData, '/add')
api.add_resource(GetData, '/get')
api.add_resource(UpdateData, '/update')

 
if __name__ == '__main__':
    app.run(debug=True)