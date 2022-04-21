import sqlite3
from urllib import response
from flask import Flask, render_template, jsonify, request, abort, redirect
import os
from dotenv import load_dotenv
from flask.helpers import send_from_directory
from flask.wrappers import Response
import psycopg2
import psycopg2.extras as ext
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from base64 import b64encode
import base64
from io import BytesIO  # Converts data from Database into bytes
from urllib.parse import unquote


DATABASE_URL = os.environ.get('DATABASE_URL')


USERNAME = os.environ.get('USERNAME')
PASSWORD = os.environ.get('PASSWORD')

# print(USERNAME, PASSWORD)

app = Flask(__name__, template_folder='templates')
# cors = CORS(app)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1 per 30seconds", "50 per hour"]
)


class ProductsTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS products (id INTEGER NOT NULL,title TEXT NOT NULL,price INTEGER NOT NULL,img TEXT NOT NULL)")

    def display(self):
        self.cur.execute("SELECT * FROM products")
        self.records = self.cur.fetchall()
        return self.records

    def search(self, id):
        self.cur.execute(f"SELECT * FROM products WHERE id = '{id}'")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, id, title, price, img):
        if (id == "" or price == "" or title == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""
        INSERT INTO products (id, title, price, img) VALUES {(id ,title, price, img)};
        """)
        self.conn.commit()

    def update(self, id, title, price, img):
        self.cur.execute(
            f"UPDATE products SET title = '{title}' WHERE id = '{id}'")
        self.cur.execute(
            f"UPDATE products SET price = '{price}' WHERE id = '{id}'")
        self.cur.execute(
            f"UPDATE products SET img = '{img}' WHERE id = '{id}'")
        self.conn.commit()

    def delete(self, id):
        if (id == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"DELETE FROM products WHERE id = '{id}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class PromocodesTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS promocodes (id INTEGER NOT NULL,code TEXT NOT NULL,amount FLOAT NOT NULL)")

    def display(self):
        self.cur.execute("SELECT * FROM promocodes")
        self.records = self.cur.fetchall()
        return self.records

    def search(self, id):
        self.cur.execute(f"SELECT * FROM promocodes WHERE id = '{id}'")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, id, code, amount):
        if (id == "" or code == "" or amount == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""
        INSERT INTO promocodes (id, code, amount) VALUES {(id, code ,amount)};
        """)
        self.conn.commit()

    def update(self, id, code, amount):
        self.cur.execute(
            f"UPDATE promocodes SET code = '{code}' WHERE id = '{id}'")
        self.cur.execute(
            f"UPDATE promocodes SET amount = '{amount}' WHERE id = '{id}'")
        self.conn.commit()

    def delete(self, id):
        if (id == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(f"DELETE FROM promocodes WHERE id = '{id}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class StoreNameTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS storeNames (storeName TEXT NOT NULL)")

    def search(self):
        self.cur.execute(f"SELECT * FROM storeNames")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, storeName):
        if (storeName == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""
        INSERT INTO storeNames (storeName) VALUES ('{storeName}');
        """)
        self.conn.commit()

    def update(self, storeName):
        self.cur.execute(
            f"UPDATE storeNames SET storeName = '{storeName}'")
        self.conn.commit()

    def delete(self, storeName):
        if (storeName == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(
            f"DELETE FROM storeNames WHERE storeName = '{storeName}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class StoreThemeTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS storeThemes (storeTheme TEXT NOT NULL)")

    def search(self):
        self.cur.execute(f"SELECT * FROM storeThemes")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, storeTheme):
        if (storeTheme == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""
        INSERT INTO storeThemes (storeTheme) VALUES ('{storeTheme}');
        """)
        self.conn.commit()

    def update(self, storeTheme):
        self.cur.execute(
            f"UPDATE storeThemes SET storeTheme = '{storeTheme}'")
        self.conn.commit()

    def delete(self, storeTheme):
        if (storeTheme == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(
            f"DELETE FROM storeThemes WHERE storeTheme = '{storeTheme}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


class StoreNumTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        #self.conn = sqlite3.connect("spdb.db")
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS storeNums (storeNum BIGINT NOT NULL)")

    def search(self):
        self.cur.execute(f"SELECT * FROM storeNums")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, storeNum):
        if (storeNum == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"""
        ALTER TABLE storeNums alter column storeNum type bigint;
        INSERT INTO storeNums (storeNum) VALUES ('{storeNum}');
        """)
        self.conn.commit()

    def update(self, storeNum):
        self.cur.execute(
            f"UPDATE storeNums SET storeNum = '{storeNum}'")
        self.conn.commit()

    def delete(self, storeNum):
        if (storeNum == None):
            raise Exception("You have to select an id to delete its values")
        self.cur.execute(
            f"DELETE FROM storeNums WHERE storeNum = '{storeNum}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


###### routes ######

@app.route("/main")
@limiter.exempt
def main_view():
    return render_template('main.html')


@app.route("/")
@limiter.exempt
def home_view():
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
        return redirect('../../admin')

    else:
        print(401)
        abort(401)


@app.route("/admin")
@limiter.exempt
def admin_view():

    return render_template('admin.html')


###### Backend ######

def render_picture(data):

    render_pic = base64.b64encode(data).decode('ascii')
    return render_pic


@app.route("/product", methods=['POST'])
@app.route("/product/<idIn>", methods=['PUT', 'DELETE', 'GET'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def product(idIn=None):
    print('The ip address: ', get_remote_address())
    newObj = ProductsTable()

    if request.method == 'POST':

        file = request.files['image']
        # fileName = file.filename
        imgFile = render_picture(file.read())
        # render_file = render_picture(imgFile)

        data = request.headers
        id = unquote(data['id'])
        title = unquote(data['title'])
        price = unquote(data['price'])

        try:
            result = newObj.search(id)
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
            newObj.insert(id, title, price, imgFile)

            recordSearched = newObj.search(id)
            if (recordSearched[0] == int(id)):
                return jsonify({"msg": f"Success 201: product_id:{id} is recorded, the id matches {(newObj.search(id))[0]}", "statCode": 201})
        except:
            if (isinstance(id, int) == False or isinstance(price, int) == False):
                return jsonify({"msg": f"Bad Request 400: product was not added, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: product_id:{id} was not recorded, the id doesn't match {(newObj.search(id))[0]}", "statCode": 500})

    elif request.method == 'PUT':

        file = request.files['image']
        # fileName = file.filename
        imgFile = render_picture(file.read())
        # render_file = render_picture(imgFile)

        data = request.headers
        title = unquote(data['title'])
        price = unquote(data['price'])

        # if imgFilename == '':
        #     imgFilename = 'no image was provided'

        try:
            oldPrudRecord = newObj.search(idIn)
            newObj.update(idIn, title, price, imgFile)

            recordSearched = newObj.search(idIn)
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: product_idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
            else:
                return jsonify({"msg": f"Success 200: product_idIn:{idIn} is updated, old data:{oldPrudRecord}, new data:{newObj.search(idIn)}", "statCode": 200})
        except:
            if (isinstance(idIn, int) == False or isinstance(price, int) == False):
                return jsonify({"msg": f"Bad Request 400: product was not updated, even the provided id or price are not integer, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: product_idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{newObj.search(idIn)}", "statCode": 500})

    elif request.method == 'GET':

        try:
            result = newObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 202: the product_idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
            else:
                return jsonify({"msg": f"Status Code 403: the product_idIn {idIn} exists, {newObj.search(idIn)[0::2]}", "statCode": 403})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  product_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

    elif request.method == 'DELETE':

        try:
            result = newObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Error 404: product_idIn:{idIn} was not found, it may not exist", "statCode": 404})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  product_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        newObj.delete(idIn)

        result = newObj.search(idIn)

        if result == None:
            return jsonify({"msg": f"Success 204: product_idIn:{idIn} is deleted successfully, product_idIn:{idIn} doesn't exist anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete product_idIn:{idIn}, product_idIn:{idIn} still exists", "statCode": 500})


@app.route("/products", methods=['GET'])
@limiter.exempt
def products():
    newObj = ProductsTable()

    result = newObj.display()
    dictOfResult = {}
    j = 0
    for i in result:
        dictOfResult[j] = {'id': i[0], 'title': i[1],
                           'price': i[2], 'img': i[3]}
        j += 1

    newIndex = sorted(dictOfResult, key=lambda d: dictOfResult[d]['id'])
    dictOfResult = {newIndex[k]: dictOfResult[k] for k in newIndex}

    if(dictOfResult == {}):
        return jsonify({"msg": f"No Content 204: There is no content to get from", "statCode": 204})
    else:
        return jsonify(dictOfResult)


@app.route("/promocode", methods=['POST'])
@app.route("/promocode/<idIn>", methods=['PUT', 'DELETE', 'GET'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def promocode(idIn=None):
    print('The ip address: ', get_remote_address())
    newObj = PromocodesTable()

    if request.method == 'POST':

        data = request.get_json()
        id = data['id']
        code = data['code']
        try:
            amount = int(data['amount'])/100
        except:
            return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

        try:
            result = newObj.search(id)
            if result == None:
                pass
            else:
                return jsonify({"msg": f"Status Code 403: the product_id:{id} exists", "statCode": 403})
        except:
            if (isinstance(id, int) == False):
                return jsonify({"msg": f"Bad Request 400:  id is not integer, or it contains illegal form of characters", "statCode": 400})

        try:
            newObj.insert(id, code, amount)

            recordSearched = newObj.search(id)
            if (recordSearched[0] == int(id)):
                return jsonify({"msg": f"Success 201: code_id:{id} is recorded, the id matches {(newObj.search(id))[0]}", "statCode": 201})
        except:
            if (isinstance(id, int) == False or isinstance(amount, float) == False):
                return jsonify({"msg": f"Bad Request 400: code was not added, even the provided id or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: code_id:{id} was not recorded, the id doesn't match {(newObj.search(id))[0]}", "statCode": 500})

    elif request.method == 'PUT':

        data = request.get_json()
        code = data['code']
        try:
            amount = int(data['amount'])/100

        except:

            return jsonify({"msg": f"Bad Request 400: code was not added, even the provided amount is not float, or it contains illegal form of characters", "statCode": 400})

        try:

            oldPrudRecord = newObj.search(idIn)
            newObj.update(idIn, code, amount)

            recordSearched = newObj.search(idIn)
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: code_idIn:{idIn} was not updated because they didn't have a record before (maybe first time adding?) ", "statCode": 404})
            else:
                return jsonify({"msg": f"Success 200: code_idIn::{idIn} is updated, old data:{oldPrudRecord}, new data:{newObj.search(idIn)}", "statCode": 200})
        except:

            if (isinstance(idIn, int) == False or isinstance(amount, float) == False):
                return jsonify({"msg": f"Bad Request 400: code was not updated, even the provided idIn or amount are not integer/float, or they contain illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: code_idIn:{idIn} was not updated, old data:{oldPrudRecord}, new data:{newObj.search(idIn)}", "statCode": 500})

    elif request.method == 'GET':

        try:
            result = newObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Success 202: the promocode_idIn {idIn} doesn't exist, so it can be added", "statCode": 202})
            else:
                return jsonify({"msg": f"Status Code 403: the promocode_idIn {idIn} exists, {newObj.search(idIn)[0::2]}", "statCode": 403})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  promocode_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

    elif request.method == 'DELETE':

        try:
            result = newObj.search(idIn)

            if result == None:
                return jsonify({"msg": f"Error 404: promocode_idIn:{idIn} was not found, it may not exist", "statCode": 404})
        except:
            if (isinstance(idIn, int) == False):
                return jsonify({"msg": f"Bad Request 400:  promocode_idIn is not integer, or it contains illegal form of characters", "statCode": 400})

        newObj.delete(idIn)

        result = newObj.search(idIn)

        if result == None:
            return jsonify({"msg": f"Success 204: code_idIn:{idIn} is deleted successfully, code_idIn:{idIn} doesn't exist anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete code_idIn:{idIn}, code_idIn:{idIn} still exists", "statCode": 500})


@app.route("/promocodes", methods=['GET'])
@limiter.exempt
def promocodes():
    newObj = PromocodesTable()

    result = newObj.display()
    dictOfResult = {}
    j = 0
    for i in result:
        dictOfResult[j] = {'id': i[0], 'code': i[1], 'amount': i[2]}
        j += 1

    newIndex = sorted(dictOfResult, key=lambda d: dictOfResult[d]['id'])
    dictOfResult = {newIndex[k]: dictOfResult[k] for k in len(newIndex)}

    if(dictOfResult == {}):
        return jsonify({"msg": f"No Content 204: There is no content to get from", "statCode": 204})
    else:
        return jsonify(dictOfResult)


@app.route("/storeName", methods=['POST', 'PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeName():
    print('The ip address: ', get_remote_address())
    newObj = StoreNameTable()

    if request.method == 'POST':

        data = request.get_json()
        storeName = data['storeName']

        try:
            newObj.insert(storeName)

            recordSearched = newObj.search()
            if (recordSearched[0] == storeName):
                return jsonify({"msg": f"Success 201: storeName:{storeName} is recorded, the storeName matches {(newObj.search())[0]}", "statCode": 201})
        except:
            return jsonify({"msg": f"Unkown Error 500: storeName:{storeName} was not recorded, the storeName doesn't match {(newObj.search())[0]}", "statCode": 500})

    elif request.method == 'PUT':
        data = request.get_json()
        storeName = data['storeName']
        result = newObj.search()

        try:
            newObj.update(storeName)

            recordSearched = newObj.search()
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeName:{storeName} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == storeName):
                return jsonify({"msg": f"Success 200: storeName:{storeName} is updated, old data:{result}, new data:{newObj.search()}", "statCode": 200})
        except:
            return jsonify({"msg": f"Unkown Error 500: storeName:{storeName} was not updated, old data:{result}, new data:{newObj.search()}", "statCode": 500})

    elif request.method == 'DELETE':
        result = newObj.search()

        if result == None:
            return jsonify({"msg": f"Error 404: storeName:{result} was not found, it may not exist", "statCode": 404})

        newObj.delete(newObj.search()[0])

        result = newObj.search()

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
    newObj = StoreNameTable()
    if newObj.search() == None:
        return jsonify({"storeName": "none/لايوجد"})
    else:
        return jsonify({"storeName": newObj.search()})


@app.route("/storeTheme", methods=['POST', 'PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeTheme():
    print('The ip address: ', get_remote_address())
    newObj = StoreThemeTable()
    if request.method == 'POST':
        data = request.get_json()
        storeTheme = data['storeTheme']

        try:
            newObj.insert(storeTheme)

            recordSearched = newObj.search()
            if (recordSearched[0] == storeTheme):
                return jsonify({"msg": f"Success 201: storeTheme:{storeTheme} is recorded, the storeTheme matches {(newObj.search())[0]}", "statCode": 201})
        except:
            return jsonify({"msg": f"Unkown Error 500: storeTheme:{storeTheme} was not recorded, the storeTheme doesn't match {(newObj.search())[0]}", "statCode": 500})

    elif request.method == 'PUT':
        data = request.get_json()
        storeTheme = data['storeTheme']
        result = newObj.search()
        try:
            newObj.update(storeTheme)

            recordSearched = newObj.search()
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeTheme:{storeTheme} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (recordSearched[0] == storeTheme):
                return jsonify({"msg": f"Success 200: storeTheme:{storeTheme} is updated, old data:{result}, new data:{newObj.search()}", "statCode": 200})
        except:
            return jsonify({"msg": f"Unkown Error 500: storeTheme:{storeTheme} was not updated, old data:{result}, new data:{newObj.search()}", "statCode": 500})

    elif request.method == 'DELETE':
        result = newObj.search()

        if result == None:
            return jsonify({"msg": f"Error 404: storeTheme:{result} was not found, it may not exist", "statCode": 404})

        newObj.delete(newObj.search()[0])

        result = newObj.search()

        if result == None:
            return jsonify({"msg": f"Success 204: store name is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeTheme:{result}, storeTheme:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeTheme/show", methods=['GET'])
@limiter.exempt
def storeThemeGet():
    print('The ip address: ', get_remote_address())
    newObj = StoreThemeTable()
    if newObj.search() == None:
        return jsonify({"storeTheme": "none/لايوجد"})
    else:
        return jsonify({"storeTheme": newObj.search()})


@app.route("/storeNum", methods=['POST', 'PUT', 'DELETE'])
@limiter.limit('1 per 10seconds', per_method=True, methods=['PUT', 'POST', 'DELETE'])
def storeNum():
    print('The ip address: ', get_remote_address())
    newObj = StoreNumTable()
    if request.method == 'POST':
        data = request.get_json()
        storeNum = data['storeNum']

        try:
            newObj.insert(storeNum)

            recordSearched = newObj.search()
            if (int(recordSearched[0]) == (storeNum)):
                return jsonify({"msg": f"Success 201: storeNum:{storeNum} is recorded, the storeNum matches {(newObj.search())[0]}", "statCode": 201})
        except:
            if (isinstance(storeNum, int) == False):
                return jsonify({"msg": f"Bad Request 400: storeNum was not added, even the provided storeNum is not integer, or it contains illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: storeNum:{storeNum} was not recorded, the storeNum doesn't match {(newObj.search())[0]}", "statCode": 500})

    elif request.method == 'PUT':
        data = request.get_json()
        storeNum = data['storeNum']
        result = newObj.search()

        try:
            newObj.update(storeNum)

            recordSearched = newObj.search()
            if recordSearched == None:
                return jsonify({"msg": f"Error 404: storeNum:{storeNum} was not updated because it didn't have a record before (maybe first time adding?) ", "statCode": 404})
            elif (int(recordSearched[0]) == int(storeNum)):
                return jsonify({"msg": f"Success 200: storeNum:{storeNum} is updated, old data:{result}, new data:{newObj.search()}", "statCode": 200})
        except:
            if (isinstance(storeNum, int) == False):
                return jsonify({"msg": f"Bad Request 400: storeNum was not updated, even the provided storeNum is not integer, or it contains illegal form of characters", "statCode": 400})
            else:
                return jsonify({"msg": f"Unkown Error 500: storeNum:{storeNum} was not updated, old data:{result}, new data:{newObj.search()}", "statCode": 500})

    elif request.method == 'DELETE':
        result = newObj.search()

        if result == None:
            return jsonify({"msg": f"Error 404: storeNum:{result} was not found, it may not exist", "statCode": 404})

        newObj.delete(newObj.search()[0])

        result = newObj.search()

        if result == None:
            return jsonify({"msg": f"Success 204: store name is deleted successfully", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete storeNum:{result}, storeNum:{result} still exists", "statCode": 500})
    else:

        abort(405)


@app.route("/storeNum/show", methods=['GET'])
@limiter.exempt
def storeNumGet():
    print('The ip address: ', get_remote_address())
    newObj = StoreNumTable()
    if newObj.search() == None:
        return jsonify({"storeNum": "none/لايوجد"})
    else:
        return jsonify({"storeNum": newObj.search()})

###### errors ######


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


###### other ######
