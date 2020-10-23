from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
import pymongo
 
app = Flask(__name__)
api = Api(app)
class SignUp(Resource):
    def post(self):
         
        return 1

class SignIn(Resource):
    def post(self):
        return 1

class AddData(Resource):
    def post(self):
        return 1

class GetData(Resource):
    def post(self):
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