#####################
###### Imports ######
#####################
import sqlite3
from flask import Flask, render_template, jsonify, request, abort, redirect
import os
from dotenv import load_dotenv
import psycopg2
import psycopg2.extras as ext
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from urllib.parse import unquote

from .models import *
from .other import *
#########################
###### Imports END ######
#########################


#####################
###### Configs ######
#####################
USERNAME = os.environ.get('USERNAME')
PASSWORD = os.environ.get('PASSWORD')
ADMIN_ROUTE = os.environ.get('ADMIN_ROUTE')

# print(USERNAME, PASSWORD)

app = Flask(__name__, template_folder='templates')
# cors = CORS(app)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1 per 30seconds", "50 per hour"]
)
#########################
###### Configs END ######
#########################


####################
###### Routes ######
####################
@app.route("/main")
@limiter.exempt
def main_view():

    storeInfoObj = StoreInfoTable()

    return render_template('main.html')


@app.route("/")
@limiter.exempt
def home_view():

    storeInfoObj = StoreInfoTable()

    return render_template('main.html')


@app.route("/login")
@limiter.exempt
def login_view():
    return render_template('login.html')


@app.route("/verify/<username>/<password>")
@limiter.exempt
def verify(username, password):

    if(username == USERNAME and password == PASSWORD):
        print(200)
        return redirect(f'../../{ADMIN_ROUTE}')

    else:
        print(401)
        abort(401)


@app.route(f"/{ADMIN_ROUTE}")
@limiter.exempt
def admin_view():

    return render_template('admin.html')
########################
###### Routes END ######
########################


##########################
###### Backend Endpoints ######
##########################
@app.route("/product", methods=['POST'])
@app.route("/product/<idIn>", methods=['PUT', 'DELETE', 'GET'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def product(idIn=None):
    try:
        print('The ip address: ', get_remote_address())
        productObj = ProductsTable()

        if request.method == 'POST':

            file = request.files['image']
            # fileName = file.filename
            imgFile = render_picture(file.read())
            # render_file = render_picture(imgFile)

            data = request.headers
            id = unquote(data['id'])
            title = unquote(data['title'])
            price = unquote(data['price'])
            avail = unquote(data['avail'])
            print(avail)

            try:
                result = productObj.search(id)
                if result == None:
                    pass
                else:
                    return jsonify({"msg": f"Status Code 403: the product of id:{id} exists", "statCode": 403})
            except Exception as err:
                print(err, "line: 125")
                if (isinstance(id, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  id is not integer, or it contains illegal form of characters", "statCode": 400})

            # if imgFilename == '':
            #     imgFile = 'no image was provided'

            try:
                productObj.insert(id, title, price, imgFile, avail)

                recordSearched = productObj.search(id)
                if (recordSearched[0] == int(id)):
                    return jsonify({"msg": f"Success 201: product of id:{id} is recorded, the id matches {(productObj.search(id))[0]}", "statCode": 201})
            except Exception as err:
                print(err, "line: 139")
                if (isinstance(id, int) == False or isinstance(price, int) == False):
                    return jsonify({"msg": f"Bad Request 400: product was not added, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
                else:
                    return jsonify({"msg": f"Unkown Error 500: product of id:{id} was not recorded, the id doesn't match {(productObj.search(id))[0]}", "statCode": 500})

        elif request.method == 'PUT':

            data = request.headers
            title = unquote(data['title'])
            price = unquote(data['price'])
            avail = unquote(data['avail'])

            try:
                oldPrudRecord = productObj.search(idIn)
                productObj.update(idIn, title, price, avail)

                recordSearched = productObj.search(idIn)
                if recordSearched == None:
                    return jsonify({"msg": f"Error 404: product of idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
                else:
                    return jsonify({"msg": f"Success 200: product of idIn:{idIn} is updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 200})
            except Exception as err:
                print(err, "line: 162")
                if (isinstance(idIn, int) == False or isinstance(price, int) == False):
                    return jsonify({"msg": f"Bad Request 400: product was not updated, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
                else:
                    return jsonify({"msg": f"Unkown Error 500: product of idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 500})

        elif request.method == 'GET':

            try:
                result = productObj.search(idIn)

                if result == None:
                    return jsonify({"msg": f"Success 202: the product of idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
                else:
                    return jsonify({"msg": f"Status Code 403: the product of idIn {idIn} exists, {productObj.search(idIn)[0::2]}", "statCode": 403})
            except Exception as err:
                print(err, "line: 178")
                if (isinstance(idIn, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  product of idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        elif request.method == 'DELETE':

            try:
                result = productObj.search(idIn)

                if result == None:
                    return jsonify({"msg": f"Error 404: product of idIn:{idIn} was not found, it may not exist", "statCode": 404})
            except Exception as err:
                print(err, "line: 190")
                if (isinstance(idIn, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  product of idIn is not integer, or it contains illegal form of characters", "statCode": 400})

            productObj.delete(idIn)

            result = productObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 204: product of idIn:{idIn} is deleted successfully, product of idIn:{idIn} doesn't exist anymore", "statCode": 204})
            else:
                return jsonify({"msg": f"Error 500: failed to delete product of idIn:{idIn}, product of idIn:{idIn} still exists", "statCode": 500})
    except Exception as err:
        print(err, "line: 203")


@app.route("/product/image/edit/<idIn>", methods=['PUT'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT'])
def productImageUpdate(idIn=None):
    try:
        print('The ip address: ', get_remote_address())
        productObj = ProductsTable()
        fileEdit = request.files['image']
        imgFileEdit = render_picture(fileEdit.read())

        try:
            oldPrudRecord = productObj.search(idIn)
            productObj.updateImage(idIn, imgFileEdit)

            recordSearched = productObj.search(idIn)
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: product of idIn:{idIn} image was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
            else:
                return jsonify({"msg": f"Success 200: product of idIn:{idIn} image is updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 200})
        except Exception as err:
            print(err, "line: 224")
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400: product image was not updated, even the provided id is not integer, or it contains illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: product of idIn:{idIn} image was not updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 500})
    except Exception as err:
        print(err, "line: 230")


@app.route("/products", methods=['GET'])
@limiter.exempt
def products():
    productObj = ProductsTable()

    result = productObj.display()
    dictOfResult = {}

    j = 0
    for i in result:
        dictOfResult[i[0]] = {'id': i[0], 'title': i[1],
                              'price': i[2], 'img': i[3],
                              'avail': i[4]}

    newIndex = sorted(dictOfResult, key=lambda d: d)
    dictOfResult = {k: dictOfResult[k] for k in newIndex}

    if(dictOfResult == {}):
        return jsonify({"msg": f"No Content 204: There is no content to get.", "statCode": 204})
    else:
        return jsonify(dictOfResult)


@app.route("/promocode", methods=['POST'])
@app.route("/promocode/<idIn>", methods=['PUT', 'DELETE', 'GET'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def promocode(idIn=None):
    try:
        print('The ip address: ', get_remote_address())
        promoObj = PromocodesTable()

        if request.method == 'POST':

            data = request.get_json()
            id = data['id']
            code = data['code']
            exp = data['exp']
            try:
                amount = int(data['amount'])/100
            except Exception as err:
                print(err, "line: 273")
                return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

            try:
                result = promoObj.search(id)
                if result == None:
                    pass
                else:
                    return jsonify({"msg": f"Status Code 403: the product of id:{id} exists", "statCode": 403})
            except Exception as err:
                print(err, "line: 283")
                if (isinstance(id, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  id is not integer, or it contains illegal form of characters", "statCode": 400})

            try:
                promoObj.insert(id, code, amount, exp)

                recordSearched = promoObj.search(id)
                if (recordSearched[0] == int(id)):
                    return jsonify({"msg": f"Success 201: code of id:{id} is recorded, the id matches {(promoObj.search(id))[0]}", "statCode": 201})
            except Exception as err:
                print(err, "line: 294")
                if (isinstance(id, int) == False or isinstance(amount, float) == False):
                    return jsonify({"msg": f"Bad Request 400: code was not added, even the provided id or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
                else:
                    return jsonify({"msg": f"Unkown Error 500: code of id:{id} was not recorded, the id doesn't match {(promoObj.search(id))[0]}", "statCode": 500})

        elif request.method == 'PUT':

            data = request.get_json()
            code = data['code']
            exp = data['exp']
            try:
                amount = int(data['amount'])/100

            except Exception as err:
                print(err, "line: 309")
                return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

            try:

                oldPrudRecord = promoObj.search(idIn)
                promoObj.update(idIn, code, amount, exp)

                recordSearched = promoObj.search(idIn)
                if recordSearched == None:
                    return jsonify({"msg": f"Error 404: code of idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
                else:
                    return jsonify({"msg": f"Success 200: code of idIn::{idIn} is updated, old data:{oldPrudRecord}, new data:{promoObj.search(idIn)}", "statCode": 200})
            except Exception as err:
                print(err, "line: 323")
                if (isinstance(idIn, int) == False or isinstance(amount, float) == False):
                    return jsonify({"msg": f"Bad Request 400: code was not updated, even the provided idIn or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
                else:
                    return jsonify({"msg": f"Unkown Error 500: code of idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{promoObj.search(idIn)}", "statCode": 500})

        elif request.method == 'GET':

            try:
                result = promoObj.search(idIn)

                if result == None:
                    return jsonify({"msg": f"Success 202: the promocode of idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
                else:
                    return jsonify({"msg": f"Status Code 403: the promocode of idIn {idIn} exists, {promoObj.search(idIn)[0::2]}", "statCode": 403})
            except Exception as err:
                print(err, "line: 339")
                if (isinstance(idIn, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  promocode of idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        elif request.method == 'DELETE':

            try:
                result = promoObj.search(idIn)

                if result == None:
                    return jsonify({"msg": f"Error 404: promocode of idIn:{idIn} was not found, it may not exist", "statCode": 404})
            except Exception as err:
                print(err, "line: 351")
                if (isinstance(idIn, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  promocode of idIn is not integer, or it contains illegal form of characters", "statCode": 400})

            promoObj.delete(idIn)

            result = promoObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 204: code of idIn:{idIn} is deleted successfully, code of idIn:{idIn} doesn't exist anymore", "statCode": 204})
            else:
                return jsonify({"msg": f"Error 500: failed to delete code of idIn:{idIn}, code of idIn:{idIn} still exists", "statCode": 500})
    except Exception as err:
        print(err, "line: 364")


@app.route("/promocodes", methods=['GET'])
@limiter.exempt
def promocodes():
    promoObj = PromocodesTable()

    result = promoObj.display()
    dictOfResult = {}

    for i in result:
        dictOfResult[i[0]] = {'id': i[0],
                              'code': i[1], 'amount': i[2], 'exp': i[3]}

    newIndex = sorted(dictOfResult, key=lambda d: d)
    dictOfResult = {k: dictOfResult[k] for k in newIndex}

    if(dictOfResult == {}):
        return jsonify({"msg": f"No Content 204: There is no content to get.", "statCode": 204})
    else:
        return jsonify(dictOfResult)


@app.route("/storeInfo", methods=['POST'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['POST'])
def storeInfo():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()

    if request.method == 'POST':

        data = request.get_json()
        storeInfo = data
        print(storeInfo)

        try:
            storeInfoObj.insert(storeInfo)

            recordSearched = storeInfoObj.search('name')
            if (recordSearched[0] == storeInfo['storeName']):
                return jsonify({"msg": f"Success 201: storeName:{storeInfo['storeName']} is recorded, the storeName matches {(storeInfoObj.search('name'))[0]}", "statCode": 201})
        except Exception as err:
            print(err, "line: 405")
            return jsonify({"msg": f"Unkown Error 500: storeName:{storeInfo['storeName']} was not recorded, the storeName doesn't match {(storeInfoObj.search('name'))[0]}", "statCode": 500})


@app.route("/storeName", methods=['PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeName():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()

    if request.method == 'PUT':
        data = request.get_json()
        storeName = data['storeName']
        result = storeInfoObj.search('name')

        try:
            storeInfoObj.update('name', storeName)

            recordSearched = storeInfoObj.search('name')
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeName:{storeName} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == storeName):
                return jsonify({"msg": f"Success 200: storeName:{storeName} is updated, old data:{result}, new data:{storeInfoObj.search('name')}", "statCode": 200})
        except Exception as err:
            print(err, "line: 429")
            return jsonify({"msg": f"Unkown Error 500: storeName:{storeName} was not updated, old data:{result}, new data:{storeInfoObj.search('name')}", "statCode": 500})

    elif request.method == 'DELETE':
        result = storeInfoObj.search('name')

        if result == None:
            return jsonify({"msg": f"Error 404: storeName:{result} was not found, it may not exist", "statCode": 404})

        storeInfoObj.delete('name', storeInfoObj.search('name')[0])

        result = storeInfoObj.search('name')

        if result == None:
            return jsonify({"msg": f"Success 204: store name is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeName:{result}, storeName:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeName/show", methods=['GET'])
@limiter.exempt
def storeNameGet():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()
    if storeInfoObj.search('name') == None:
        return jsonify({"storeName": "none/لايوجد"})
    else:
        return jsonify({"storeName": storeInfoObj.search('name')})


@app.route("/storeDetails", methods=['PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeDetails():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()

    if request.method == 'PUT':
        data = request.get_json()
        storeDetails = data['storeDetails']
        result = storeInfoObj.search('details')

        try:
            storeInfoObj.update('details', storeDetails)

            recordSearched = storeInfoObj.search('details')
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeDetails:{storeDetails} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == storeDetails):
                return jsonify({"msg": f"Success 200: storeDetails:{storeDetails} is updated, old data:{result}, new data:{storeInfoObj.search('details')}", "statCode": 200})
        except Exception as err:
            print(err, "line: 482")
            return jsonify({"msg": f"Unkown Error 500: storeDetails:{storeDetails} was not updated, old data:{result}, new data:{storeInfoObj.search('details')}", "statCode": 500})

    elif request.method == 'DELETE':
        result = storeInfoObj.search('details')

        if result == None:
            return jsonify({"msg": f"Error 404: storeDetails:{result} was not found, it may not exist", "statCode": 404})

        storeInfoObj.delete('details', storeInfoObj.search('details')[0])

        result = storeInfoObj.search('details')

        if result == None:
            return jsonify({"msg": f"Success 204: store details is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeDetails:{result}, storeDetails:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeDetails/show", methods=['GET'])
@limiter.exempt
def storeDetailsGet():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()
    if storeInfoObj.search('details') == None:
        return jsonify({"storeDetails": "none/لايوجد"})
    else:
        return jsonify({"storeDetails": storeInfoObj.search('details')})


@app.route("/billDetails", methods=['PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def billDetails():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()

    if request.method == 'PUT':
        data = request.get_json()
        billDetails = data['billDetails']
        result = storeInfoObj.search('billDetails')

        try:
            storeInfoObj.update('billDetails', billDetails)

            recordSearched = storeInfoObj.search('billDetails')
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: billDetails:{billDetails} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == billDetails):
                return jsonify({"msg": f"Success 200: billDetails:{billDetails} is updated, old data:{result}, new data:{storeInfoObj.search('billDetails')}", "statCode": 200})
        except Exception as err:
            print(err, "line: 535")
            return jsonify({"msg": f"Unkown Error 500: billDetails:{billDetails} was not updated, old data:{result}, new data:{storeInfoObj.search('billDetails')}", "statCode": 500})

    elif request.method == 'DELETE':
        result = storeInfoObj.search('billDetails')

        if result == None:
            return jsonify({"msg": f"Error 404: billDetails:{result} was not found, it may not exist", "statCode": 404})

        storeInfoObj.delete(
            'billDetails', storeInfoObj.search('billDetails')[0])

        result = storeInfoObj.search('billDetails')

        if result == None:
            return jsonify({"msg": f"Success 204: billDetails is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete billDetails:{result}, billDetails:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/billingHistory", methods=['POST', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def billingHistory():
    try:
        print('The ip address: ', get_remote_address())
        billHisObj = billingHistoryTable()

        if request.method == 'POST':

            data = request.get_json()
            id = data['billId']
            bill = data['bill']
            billDate = data['billDate']

            try:
                result = billHisObj.search(bill)
                if result == None:
                    pass
                else:
                    return jsonify({"msg": f"Status Code 403: the bill exists", "statCode": 403})
            except Exception as err:
                print(err, "line: 580")
                return jsonify({"msg": f"{err}", "statCode": 400})

            try:
                billHisObj.insert(id, bill, billDate)

                recordSearched = billHisObj.search(bill)
                if (recordSearched[1] == bill):
                    return jsonify({"msg": f"Success 201: bill is recorded", "statCode": 201})
            except Exception as err:
                print(err, "line: 590")
                return jsonify({"msg": f"{err}", "statCode": 500})

        elif request.method == 'DELETE':

            data = request.get_json()
            id = data['billId']

            try:
                result = billHisObj.searchId(id)

                if result == None:
                    return jsonify({"msg": f"Error 404: billId:{id} was not found, it may not exist", "statCode": 404})
            except Exception as err:
                print(err, "line: 605")
                if (isinstance(id, int) == False):
                    return jsonify({"msg": f"Bad Request 400:  billId is not integer, or it contains illegal form of characters", "statCode": 400})

            billHisObj.delete(id)

            result = billHisObj.searchId(id)

            if result == None:
                return jsonify({"msg": f"Success 204: bill of id:{id} is deleted successfully, bill of id:{id} doesn't exist anymore", "statCode": 204})
            else:
                return jsonify({"msg": f"Error 500: failed to delete bill of id:{id}, bill of id:{id} still exists", "statCode": 500})

    except Exception as err:
        print(err, "line: 620")
        return jsonify({"msg": "Error 500: error declared in backend console.", "statCode": 500})


@app.route("/billingHistory/show", methods=['GET'])
@limiter.exempt
def billingHistory_show():
    try:
        billHisObj = billingHistoryTable()

        result = billHisObj.display()

        dictOfResult = {}
        count = 0
        for i in result:
            dictOfResult[count] = {'billId': i[0], 'bill': i[1], 'billDate': i[2]}
            count += 1

        if dictOfResult == {}:
            return jsonify({"msg": f"No Content 204: There is no content to get.", "statCode": 204})
        
        else:
            count = 0
            dictOfResultReversed = {}
            reversedKeysList = sorted(dictOfResult.keys(), reverse=True)

            for i in reversedKeysList:
                dictOfResultReversed[i] = dictOfResult[count]
                count += 1

            return jsonify(dictOfResultReversed)

    except Exception as err:
        print(err, "line: 649")
        return jsonify({"msg": "Error 500: error declared in backend console.", "statCode": 500})


@app.route("/billDetails/show", methods=['GET'])
@limiter.exempt
def billDetailsGet():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()
    if storeInfoObj.search('billDetails') == None:
        return jsonify({"billDetails": "none/لايوجد"})
    else:
        return jsonify({"billDetails": storeInfoObj.search('billDetails')})


@app.route("/storeNum", methods=['PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeNum():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()

    if request.method == 'PUT':
        data = request.get_json()
        storeNum = data['storeNum']
        result = storeInfoObj.search('num')

        try:
            storeInfoObj.update('num', storeNum)

            recordSearched = storeInfoObj.search('num')
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeNum:{storeNum} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (int(recordSearched[0]) == int(storeNum)):
                return jsonify({"msg": f"Success 200: storeNum:{storeNum} is updated, old data:{result}, new data:{storeInfoObj.search('num')}", "statCode": 200})
        except Exception as err:
            print(err, "line: 676")
            if (isinstance(storeNum, int) == False):
                return jsonify({"msg": f"Bad Request 400: storeNum was not updated, even the provided storeNum is not integer, or it contains illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: storeNum:{storeNum} was not updated, old data:{result}, new data:{storeInfoObj.search('num')}", "statCode": 500})

    elif request.method == 'DELETE':
        result = storeInfoObj.search('num')

        if result == None:
            return jsonify({"msg": f"Error 404: storeNum:{result} was not found, it may not exist", "statCode": 404})

        storeInfoObj.delete('num', storeInfoObj.search('num')[0])

        result = storeInfoObj.search('num')

        if result == None:
            return jsonify({"msg": f"Success 204: storeNum is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeNum:{result}, storeNum:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeNum/show", methods=['GET'])
@limiter.exempt
def storeNumGet():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()
    if storeInfoObj.search('num') == None:
        return jsonify({"storeNum": "none/لايوجد"})
    else:
        return jsonify({"storeNum": storeInfoObj.search('num')})


@app.route("/storeTheme", methods=['POST', 'PUT', 'DELETE'])
@limiter.limit('1 per 1seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeTheme():
    print('The ip address: ', get_remote_address())
    storeCustomObj = StoreCustomTable()
    if request.method == 'POST':
        data = request.get_json()
        storeTheme = data['storeTheme']

        try:
            storeCustomObj.insert(storeTheme)

            recordSearched = storeCustomObj.search()
            if (recordSearched[0] == storeTheme):
                return jsonify({"msg": f"Success 201: storeTheme:{storeTheme} is recorded, the storeTheme matches {(storeCustomObj.search())[0]}", "statCode": 201})
        except Exception as err:
            print(err, "line: 728")
            return jsonify({"msg": f"Unkown Error 500: storeTheme:{storeTheme} was not recorded, the storeTheme doesn't match {(storeCustomObj.search())[0]}", "statCode": 500})

    elif request.method == 'PUT':
        data = request.get_json()
        storeTheme = data['storeTheme']
        result = storeCustomObj.search()
        try:
            storeCustomObj.update(storeTheme)

            recordSearched = storeCustomObj.search()
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeTheme:{storeTheme} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == storeTheme):
                return jsonify({"msg": f"Success 200: storeTheme:{storeTheme} is updated, old data:{result}, new data:{storeCustomObj.search()}", "statCode": 200})
        except Exception as err:
            print(err, "line: 744")
            return jsonify({"msg": f"Unkown Error 500: storeTheme:{storeTheme} was not updated, old data:{result}, new data:{storeCustomObj.search()}", "statCode": 500})

    elif request.method == 'DELETE':
        result = storeCustomObj.search()

        if result == None:
            return jsonify({"msg": f"Error 404: storeTheme:{result} was not found, it may not exist", "statCode": 404})

        storeCustomObj.delete(storeCustomObj.search()[0])

        result = storeCustomObj.search()

        if result == None:
            return jsonify({"msg": f"Success 204: storeTheme is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeTheme:{result}, storeTheme:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeTheme/show", methods=['GET'])
@limiter.exempt
def storeThemeGet():
    print('The ip address: ', get_remote_address())
    storeCustomObj = StoreCustomTable()
    if storeCustomObj.search() == None:
        return jsonify({"storeTheme": "none/لايوجد"})
    else:
        return jsonify({"storeTheme": storeCustomObj.search()})

##############################
###### Backend Endpoints END ######
##############################


############################
###### Error Handlers ######
############################
@app.errorhandler(429)
def ratelimit_handler(e):

    return jsonify({"msg": f"Error 429: you have exceeded your rate-limit, any further requests will not be applied", "statCode": 429})


@app.errorhandler(401)
def ratelimit_handler(e):

    msg = '{"msg": f"Error 401: unauthrized access", "statCode": 401}'
    print(msg)
    return render_template('err/err401.html', msg=msg)


@app.errorhandler(500)
def ratelimit_handler(e):

    msg = '{"msg": f"Error 500: something in our side went wrong, surly we are working to fix it soon, please try again later", "statCode": 500}'
    print(msg)
    return render_template('err/err500.html', msg=msg)


@app.errorhandler(503)
def ratelimit_handler(e):

    msg = '{"msg": f"Error 503: server is down due to maintenance, please try again later", "statCode": 503}'
    print(msg)
    return render_template('err/err503.html', msg=msg)


@app.errorhandler(405)
def ratelimit_handler(e):

    msg = '"msg": f"Error 405: the method used is not allowed, please try again with correct method", "statCode": 405}'
    print(msg)
    return render_template('err/err405.html', msg=msg)


@app.errorhandler(404)
def ratelimit_handler(e):

    msg = '{"msg": f"Error 404: the requested URL was not found on the server. If you entered the URL manually please check your spelling and try again", "statCode": 404}'
    print(msg)
    return render_template('err/err404.html', msg=msg)
################################
###### Error Handlers END ######
################################


########################
##### Play Ground ######
########################

# def exexuteSql(sql):
#     conn = psycopg2.connect(DATABASE_URL, sslmode='require')
#     #conn = sqlite3.connect("spdb.db")
#     cur = conn.cursor(cursor_factory=ext.DictCursor)
#     cur.execute(sql)
#     conn.commit()

# @app.route("/playground/on/1", methods=['POST'])
# def playground1():
#     sql='ALTER TABLE promocodes ADD COLUMN exp TEXT;'
#     try:
#         exexuteSql(sql)
#         return jsonify(f"OK: ({sql}) was done successfully.")
#     except Exception as err:
#         return jsonify(f"ERR {err}: coudn't playground ({sql})")

# @app.route("/playground/on/2", methods=['POST'])
# def playground2():
#     sql2="ALTER TABLE billingHistory ALTER COLUMN id TYPE TEXT;"
#     sql="DROP TABLE billingHistory;"
#     try:
#         exexuteSql(sql)
#         return jsonify(f"OK: ({sql}) was done successfully.")
#     except Exception as err:
#         return jsonify(f"ERR {err}: coudn't playground ({sql})")

############################
##### Play Ground End ######
############################
