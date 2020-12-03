from flask import Flask
from flask_restful import Resource, Api, abort
from flask_restful import reqparse
from flask import jsonify, request
from pymongo import MongoClient
import hashlib
from sklearn.linear_model import LinearRegression
from flask_cors import CORS, cross_origin
import pandas as pd

client = MongoClient('localhost',27017)

db = client["ootw"]
collection = db["user"]
print(collection.find())

app = Flask(__name__)

api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def getRegression(matrix, high, low):
    transposedMatrix = [[element for element in t] for t in zip(*matrix)]
    df = pd.DataFrame({
        'max': transposedMatrix[0],
        'min': transposedMatrix[1],
        'feel': transposedMatrix[2],
        'ootwindex':transposedMatrix[3],
    })
    xData = df[['max','min','feel']]
    yData = df[['ootwindex']]
    mlr = LinearRegression()
    mlr.fit(xData,yData)
    return mlr.predict([[high,low,0]])[0][0]

class SignUp(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        args = parser.parse_args()
        userID = args['id']
        userPW = args['pw']
        hasedUserPW = userPW.encode('utf-8')
        password_hash = hashlib.new('sha256')
        password_hash.update(hasedUserPW)
        storedPW = password_hash.hexdigest()
        print(storedPW, type(storedPW))
        if(collection.find_one({'id':userID})):
            return -1
        else:
            collection.insert_one({'id':userID, 'pw':storedPW, 'numData':[[35,28,0,10],[1,-5,0,170],[24,16,0,50],[18,8,0,70]], 'strData':{'tmp':[0,0,0,0]}, 'gender':1})
            return 1

class SignIn(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        args = parser.parse_args()
        userID = args['id']
        userPW = args['pw']
        hasedUserPW = userPW.encode('utf-8')
        password_hash = hashlib.new('sha256')
        password_hash.update(hasedUserPW)
        storedPW = password_hash.hexdigest()

        if(not collection.find_one({'id':userID, 'pw':storedPW})):
            return -1
        else:
            return 1

class AddData(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('numData', type=int, action="append")
        parser.add_argument('strData', type=str, action="append")
        args = parser.parse_args()
        args['strData'].append(args['numData'][0])
        args['strData'].append(args['numData'][1])
        userData = collection.find_one({"id" : args['id']})
        print(userData)
        prevNumData = userData['numData']
        prevNumData.append(args['numData'])
        prevStrData = userData['strData']
        prevStrData[args['strData'][0]] = args['strData'][1:]
        
        

        collection.update(
            {"id" : args['id']},
            { "$set" :{
                'numData' : prevNumData,
                'strData' : prevStrData
                },
            }
        ) 
        return 1

class GetData(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('high', type=int)
        parser.add_argument('low', type=int)
        args = parser.parse_args()
        try:
            matrix = collection.find_one({'id' : args['id']})['numData']
        except:
            return -1

        return getRegression(matrix, int(args['high']), int(args['low']))

class getClothingByDate(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('date', type=str)
        args = parser.parse_args()
        try:
            data = collection.find_one({'id' : args['id']})
            pastClothing = data['strData'][args['date']]
        except:
            return -1

        return pastClothing



class UpdateData(Resource):
    def post(self):
        return 1
 
api.add_resource(SignUp, '/signup')
api.add_resource(SignIn, '/signin')
api.add_resource(AddData, '/add')
api.add_resource(GetData, '/get')
api.add_resource(UpdateData, '/update')
api.add_resource(getClothingByDate, '/getClothingByDate')

 
@app.route('/')
def helloworld():
    return 'helloworld'

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5000")
    