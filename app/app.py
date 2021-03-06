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

    return render_template('main.html', description=storeInfoObj.search('details')[0])


@app.route("/")
@limiter.exempt
def home_view():

    storeInfoObj = StoreInfoTable()

    return render_template('main.html', description=storeInfoObj.search('details')[0])


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
                return jsonify({"msg": f"Status Code 403: the product_id:{id} exists", "statCode": 403})
        except:
            if (isinstance(id, int) == False):
                return jsonify({"msg": f"Bad Request 400:  id is not integer, or it contains illegal form of characters", "statCode": 400})

        # if imgFilename == '':
        #     imgFile = 'no image was provided'

        try:
            productObj.insert(id, title, price, imgFile, avail)

            recordSearched = productObj.search(id)
            if (recordSearched[0] == int(id)):
                return jsonify({"msg": f"Success 201: product_id:{id} is recorded, the id matches {(productObj.search(id))[0]}", "statCode": 201})
        except:
            if (isinstance(id, int) == False or isinstance(price, int) == False):
                return jsonify({"msg": f"Bad Request 400: product was not added, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: product_id:{id} was not recorded, the id doesn't match {(productObj.search(id))[0]}", "statCode": 500})

    elif request.method == 'PUT':

        file = request.files['image']
        # fileName = file.filename
        imgFile = render_picture(file.read())
        # render_file = render_picture(imgFile)

        data = request.headers
        title = unquote(data['title'])
        price = unquote(data['price'])
        avail = unquote(data['avail'])

        # if imgFilename == '':
        #     imgFilename = 'no image was provided'

        try:
            oldPrudRecord = productObj.search(idIn)
            productObj.update(idIn, title, price, imgFile, avail)

            recordSearched = productObj.search(idIn)
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: product_idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
            else:
                return jsonify({"msg": f"Success 200: product_idIn:{idIn} is updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 200})
        except:
            if (isinstance(idIn, int) == False or isinstance(price, int) == False):
                return jsonify({"msg": f"Bad Request 400: product was not updated, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: product_idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{productObj.search(idIn)}", "statCode": 500})

    elif request.method == 'GET':

        try:
            result = productObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 202: the product_idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
            else:
                return jsonify({"msg": f"Status Code 403: the product_idIn {idIn} exists, {productObj.search(idIn)[0::2]}", "statCode": 403})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  product_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

    elif request.method == 'DELETE':

        try:
            result = productObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Error 404: product_idIn:{idIn} was not found, it may not exist", "statCode": 404})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  product_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        productObj.delete(idIn)

        result = productObj.search(idIn)

        if result == None:
            return jsonify({"msg": f"Success 204: product_idIn:{idIn} is deleted successfully, product_idIn:{idIn} doesn't exist anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete product_idIn:{idIn}, product_idIn:{idIn} still exists", "statCode": 500})


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
        return jsonify({"msg": f"No Content 204: There is no content to get from", "statCode": 204})
    else:
        return jsonify(dictOfResult)


@app.route("/promocode", methods=['POST'])
@app.route("/promocode/<idIn>", methods=['PUT', 'DELETE', 'GET'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def promocode(idIn=None):
    print('The ip address: ', get_remote_address())
    promoObj = PromocodesTable()

    if request.method == 'POST':

        data = request.get_json()
        id = data['id']
        code = data['code']
        try:
            amount = int(data['amount'])/100
        except:
            return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

        try:
            result = promoObj.search(id)
            if result == None:
                pass
            else:
                return jsonify({"msg": f"Status Code 403: the product_id:{id} exists", "statCode": 403})
        except:
            if (isinstance(id, int) == False):
                return jsonify({"msg": f"Bad Request 400:  id is not integer, or it contains illegal form of characters", "statCode": 400})

        try:
            promoObj.insert(id, code, amount)

            recordSearched = promoObj.search(id)
            if (recordSearched[0] == int(id)):
                return jsonify({"msg": f"Success 201: code_id:{id} is recorded, the id matches {(promoObj.search(id))[0]}", "statCode": 201})
        except:
            if (isinstance(id, int) == False or isinstance(amount, float) == False):
                return jsonify({"msg": f"Bad Request 400: code was not added, even the provided id or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: code_id:{id} was not recorded, the id doesn't match {(promoObj.search(id))[0]}", "statCode": 500})

    elif request.method == 'PUT':

        data = request.get_json()
        code = data['code']
        try:
            amount = int(data['amount'])/100

        except:

            return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

        try:

            oldPrudRecord = promoObj.search(idIn)
            promoObj.update(idIn, code, amount)

            recordSearched = promoObj.search(idIn)
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: code_idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
            else:
                return jsonify({"msg": f"Success 200: code_idIn::{idIn} is updated, old data:{oldPrudRecord}, new data:{promoObj.search(idIn)}", "statCode": 200})
        except:

            if (isinstance(idIn, int) == False or isinstance(amount, float) == False):
                return jsonify({"msg": f"Bad Request 400: code was not updated, even the provided idIn or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: code_idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{promoObj.search(idIn)}", "statCode": 500})

    elif request.method == 'GET':

        try:
            result = promoObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 202: the promocode_idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
            else:
                return jsonify({"msg": f"Status Code 403: the promocode_idIn {idIn} exists, {promoObj.search(idIn)[0::2]}", "statCode": 403})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  promocode_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

    elif request.method == 'DELETE':

        try:
            result = promoObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Error 404: promocode_idIn:{idIn} was not found, it may not exist", "statCode": 404})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  promocode_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        promoObj.delete(idIn)

        result = promoObj.search(idIn)

        if result == None:
            return jsonify({"msg": f"Success 204: code_idIn:{idIn} is deleted successfully, code_idIn:{idIn} doesn't exist anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete code_idIn:{idIn}, code_idIn:{idIn} still exists", "statCode": 500})


@app.route("/promocodes", methods=['GET'])
@limiter.exempt
def promocodes():
    promoObj = PromocodesTable()

    result = promoObj.display()
    dictOfResult = {}

    for i in result:
        dictOfResult[i[0]] = {'id': i[0], 'code': i[1], 'amount': i[2]}

    newIndex = sorted(dictOfResult, key=lambda d: d)
    dictOfResult = {k: dictOfResult[k] for k in newIndex}

    if(dictOfResult == {}):
        return jsonify({"msg": f"No Content 204: There is no content to get from", "statCode": 204})
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
        except:
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
        except:
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
        return jsonify({"storeName": "none/????????????"})
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
        except:
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
        return jsonify({"storeDetails": "none/????????????"})
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
        except:
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


@app.route("/billDetails/show", methods=['GET'])
@limiter.exempt
def billDetailsGet():
    print('The ip address: ', get_remote_address())
    storeInfoObj = StoreInfoTable()
    if storeInfoObj.search('billDetails') == None:
        return jsonify({"billDetails": "none/????????????"})
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
        except:
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
        return jsonify({"storeNum": "none/????????????"})
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
        except:
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
        except:
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
        return jsonify({"storeTheme": "none/????????????"})
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

    return jsonify({"msg": f"Error 405: the method used is not allowed, please try again with correct method", "statCode": 405})


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

def exexuteSql(sql):
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    #conn = sqlite3.connect("spdb.db")
    cur = conn.cursor(cursor_factory=ext.DictCursor)
    cur.execute(sql)
    conn.commit()

# @app.route("/playground/on/1", methods=['POST'])
# def playground1():
#     sql='ALTER TABLE products ADD COLUMN avail BOOLEAN;'
#     try:
#         exexuteSql(sql)
#         return jsonify(f"[exexuteSql('{sql}')] was done successfully.")
#     except:
#         return jsonify("coudn't playground 1")

# @app.route("/playground/on/2", methods=['POST'])
# def playground2():
#     sql="ALTER TABLE products ALTER COLUMN avail SET NOT NULL;"
#     try:
#         exexuteSql(sql)
#         return jsonify(f"[exexuteSql('{sql}')] was done successfully.")
#     except:
#         return jsonify("coudn't playground 2")
############################
##### Play Ground End ######
############################
