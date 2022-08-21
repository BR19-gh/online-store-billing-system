
#### (coming soon 3.0v update...)
[New 2.0v Update Available !!!](#update-20v)
      

# Online Store Billing System

  

## Overview

  

A full-stack online store model that gives the store owner the ability to add products and their prices, the ability to add promocodes which their customers can use, and the ability of a customer to send their bill to the owner's WhatsApp, The store uses Flask as its backend, PostgreSQL as database, and CSS, HTML, JS/TS and Bootstrap as its Frontend
  

The application is deployed on Heroku and can be accessed at <br> [br19-onlinestore.herokuapp.com](https://br19-onlinestore.herokuapp.com)

  

## Running the Project Locally

  

### Project Dependencies

<hr>

  

  

#### Python 3.9.10

  

  

  

Install Here: [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

<hr>

  

  

#### Virtual Environment

  

  

*  **virtualenv** as a tool to create isolated Python environments

  

  

* It is recommended to work with a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized.

  

  

* Instructions for setting up a virtual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

<hr>

  

  

#### Installing Dependencies

  

Once you have your virtual environment setup and running, install dependencies by running:

  


```bash
pip install -r requirements.tx
```

  

This will install all the required packages as mentioned within the `requirements.txt` file.

  

#### Key Dependencies

 
-  [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

  


-  [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension to use for handling cross-origin requests from our frontend server when running the project locally.

   - after installing this dependency, uncomment the following line in `app/main.py` for the app to work locally:

``` python
# cors = CORS(app)
```

<hr>

  

### Database Setup

* SQLite is the database for local running and `spdb.db` is the database file

* PostgreSQL is the database for production environment, because of that, you have to comment out this line of code in all of `app/main.py`:

``` python
self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
```

and uncomment the following line in all `of app/main.py`:

``` python
# self.conn = sqlite3.connect("spdb.db")
```

for database connections to work locally
  

### Environment variables
  

* Create `.env` file in the root directory and put the following values in:

```
USERNAME = xxxx

PASSWORD = xxxx
```

  

### Running the server



* From within the project directory first ensure you are working using your created virtual environment, then type the following:

```bash
flask run
```

or in PowerShell for Windows

```powershell
$env:FLASK_APP  =  "app/main.py"

$env:FLASK_ENV  =  "development"

flask run
```

  
  

## API Reference

  

  

### Getting Started

  

  

- Base URL: This app can be run locally at the default URL `http://127.0.0.1:5000/`

  

  

- External URL: The app is also hosted on Heroku and can be accessed at [br19-onlinestore.herokuapp.com](https://br19-onlinestore.herokuapp.com)

  
  

  

  

### <div id="Error">Error Handling and Status Codes</div>

  

  

The API will return the following error codes and status codes

when requests fail or success:

  

- 200: Entity is Updated

  

- 201: Entity is Created

  

- 202: Accepted for Processing

  

- 204: Deleted Successfully or No Content to Return

  

- 400: Bad Request

  
  

- 401: Unauthorized Access

  
  

- 403: Entity Exists

  

- 404: Resource Not Found

  

  

- 405: Method Used Not Allowed

  
  

- 429: Rate-Limit of Requests Exceeded

  
  

- 500: Internal Server Error

  
  

- 503: Server is Down Due to Maintenance

  

  

An example of 401 error due to `PASSWORD` and `USERNAME` provided by the frontend user not matching what is in `.env`:

  

  

```python

msg =  '{"msg": f"Error 401: unauthrized access", "statCode": 401}'

return render_template('err/err401.html', msg=msg) # it will render 401 error page and pass msg to be consuled in frontend

```

  

  

  

Other errors and status codes are returned as JSON in the following format:

  

  

```json

{"msg": "Bad Request 400: storeNum was not updated, even the provided storeNum is not integer, or it contains illegal form of characters", "statCode": 400}

```

  

  

  

### API Endpoints

  
  

##### GET '/'

  

- Renders `app/templates/main.html`.

<hr>

  

##### GET '/main'

  
  

- Renders `app/templates/main.html`.

<hr>

##### GET '/login'

  
  

- Renders `app/templates/login.html`.

<hr>

  

##### GET '/admin'

  
  

- Renders `app/templates/admin.html`.

<hr>

  

##### GET '/verify/&lt;username&gt;/&lt;password&gt;'

  
  

- Checks if `<username>` = `USERNAME` in `.env` and `<password>` = `PASSWORD` in `.env` then redirect to `app/templates/admin.html`.

  
  

<hr>

  

##### GET '/products/'

  
  

  

- This route returns all products

  

  

Example:

  

```json

{

"0":{

"id":1,

"price":10,

"title":"Product A",

"img":"/* an image in form of base64 encoding */"

},

"1":{

"id":2,

"price":20,

"title":"Product B",

"img":"/* an image in form of base64 encoding */"

},

"2":{

"id":3,

"price":30,

"title":"Product C",

"img":"/* an image in form of base64 encoding */"

}

}

```

<hr>

  

##### GET '/promocodes/'

  
  

  

- This route returns all promocodes

  

  

Example:

  

```json

{
"0":{

"amount":0.5,

"code":"promo1",

"id":1

},

"1":{

"amount":0.3,

"code":"promo2",

"id":2

}

}

```

  

  

<hr>

  

##### POST'/product'

- This route will add a product to the database using the following `encodeURIComponent()`'ed header:

```json

{

"id" : "value",

"title" : "value1",

"price" : "value2",

}

```

with a body containing the uploaded image,

and returns if success:

```json

{

"msg": "Success 201: product_id:{id} is recorded, ...",

"statCode": 201

}

```

or some forms of JSON if fails according to the error, like if the header was not formed correctly:

```json

{

"msg": "Bad Request 400: product was not added, ...",

"statCode": 400

}

```

<hr>

  

##### PUT'/product/&lt;int:idIn&gt;'

- This route will update a product in the database using the following `encodeURIComponent()`'ed header:

```json

{

"title" : "value1",

"price" : "value2",

}

```

with a body containing the uploaded image,

and returns if success:

```json

{

"msg": "Success 200: product_idIn:{idIn} is updated, ...",

"statCode": 200}

//(id == idIn)

```

or some forms of JSON if fails according to the error, like if the `id` was not found:

```json

{

"msg": "Error 404: product_idIn:{idIn} was not updated because they didn't have a record before... ",

"statCode": 404

}

```

  

<hr>

  

##### DELETE'/product/&lt;int:idIn&gt;'

- This route will delete a product in the database using the `id`, and returns if success:

```json

{

"msg": "Success 204: product_idIn:{idIn} is deleted successfully, product_idIn:{idIn} doesn't exist anymore",

"statCode": 204

}

```

or some forms of JSON if fails according to the error, like if the `id` was not found:

```json

{

"msg": "Error 404: product_idIn:{idIn} was not found, it may not exist",

"statCode": 404

}

```

  

<hr>

  

##### GET'/product/&lt;int:idIn&gt;'

- This route will get a product from the database using the `id` to check if it can be added, and returns if successful:

```json

{

"msg": "Success 202: the product_idIn {idIn} doesn't exist, so it can be added",

"statCode": 202

}

```

or some forms of JSON if fails according to the error, like if the `id` is found:

```json

{

"msg": "Status Code 403: the product_idIn {idIn} exists, {newObj.search(idIn)}",

"statCode": 403

}

//newObj.search(idIn) is the record of id

```

  

<hr>

  

##### DELETE'/product/&lt;int:idIn&gt;'

- This route will delete a product in the database using the `id`, and returns if success:

```json

{

"msg": "Success 204: product_idIn:{idIn} is deleted successfully, product_idIn:{idIn} not exist anymore",

"statCode": 204

}

```

or some forms of JSON if fails according to the error, like if the `id` is not found:

```json

{

"msg": "Error 404: product_idIn:{idIn} was not found, it may not exist",

"statCode": 404

}

//id == idIn

```

  

<hr>

  

##### POST'/promocodes'

- This route will add a promocode to the database using the following body:

```json

{

"id": "value",

"code": "value1",

"amount": "value2"

}

```

and returns if success:

```json

{

"msg": "Success 201: code_id:{id} is recorded, ...",

"statCode": 201

}

```

or some forms of JSON if fails according to the error, like if the body was not formed correctly:

```json

{

"msg": "Bad Request 400: promocode was not added, ...",

"statCode": 400

}

```

<hr>

  

##### PUT'/promocode/&lt;int:idIn&gt;'

- This route will update a promocode in the database using the following body:

```json

{

"code": "value1",

"amount": "value2"

}

```

and returns if success:

```json

{

"msg": "Success 200: code_idIn:{idIn} is updated, ...",

"statCode": 200}

//(id == idIn)

```

or some forms of JSON if fails according to the error, like if the `id` was not found:

```json

{

"msg": "Error 404: code_idIn:{idIn} was not updated because they didn't have a record before... ",

"statCode": 404

}

```

  

<hr>

  

##### DELETE'/promocode/&lt;int:idIn&gt;'

- This route will delete a promocode in the database using the `id`, and returns if success:

```json

{

"msg": "Success 204: code_idIn:{idIn} is deleted successfully, code_idIn:{idIn} doesn't exist anymore",

"statCode": 204

}

```

or some forms of JSON if fails according to the error, like if the `id` was not found:

```json

{

"msg": "Error 404: code_idIn:{idIn} was not found, it may not exist",

"statCode": 404

}

```

  

<hr>

  

##### GET'/promocode/&lt;int:idIn&gt;'

- This route will get a promocode in the database using the `id` to check if it can be added, and returns if success:

```json

{

"msg": "Success 202: the code_idIn {idIn} doesn't exist, so it can be added",

"statCode": 202

}

```

or some forms of JSON if fails according to the error, like if the `id` is found:

```json

{

"msg": "Status Code 403: the code_idIn {idIn} exists, {newObj.search(idIn)}",

"statCode": 403

}

//newObj.search(idIn) is the record of id

```

  

<hr>

  

##### DELETE'/promocode/&lt;int:idIn&gt;'

- This route will delete a promocode in the database using the `id`, and returns if success:

```json

{

"msg": "Success 204: code_idIn:{idIn} is deleted successfully, code_idIn:{idIn} not exist anymore",

"statCode": 204

}

```

or some forms of JSON if fails according to the error, like if the `id` is not found:

```json

{

"msg": "Error 404: code_idIn:{idIn} was not found, it may not exist",

"statCode": 404

}

//id == idIn

```

  
  

<hr>

  

##### POST'/storeName'

- This route will add a name for the store in the database using the following body:

  

```json

{

"storeName":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 201: storeName:{storeName} is recorded, the storeName matches {(newObj.search())[0]}",

"statCode": 201

}

```

or some forms of JSON if fails according to the error, like if an unknown error happens:

```json

{

"msg": "Unkown Error 500: storeName:{storeName} was not recorded, the storeName doesn't match {(newObj.search())[0]}",

"statCode": 500

}

```

  

<hr>

  

##### PUT'/storeName/'

- This route will update the name of the store in the database using the following body:


```json

{

"storeName":"value"

}

```

  

and returns if success:

```json

{

"msg":"Success 200: storeName:{storeName} is updated, old data:{result}, new data:{newObj.search()}",

"statCode": 200

}

```

or some forms JSON if fails according to the error, like if the id was not found:

```json

{

"msg": "Error 404: storeName:{storeName} was not updated because it didn't have a record before (maybe first time adding?) ",

"statCode": 404

}

```

<hr>
  

##### DELETE'/storeName/'

- This route will delete the name of the store in the database:

  

```json

{

"storeName":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 204: store name is deleted successfully", "statCode": 204}

```

or some forms JSON if fails according to the error, like if the name was not found:

```json

{

"msg": "Error 404: storeName:{result} was not found, it may not exist",

"statCode": 404

}

```

<hr>
  

##### GET'/storeName/show'

- This route will return the store name as:

  

```json

{

"storeName":"value"

}

```

and if there's no name for the store it will return:

```json

{

"storeName":"none/لايوجد"

}

```

<hr>

  

##### POST'/storeNum'

- This route will add a number for the store in the database using the following body:

  

```json

{

"storeNum":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 201: storeNum:{storeNum} is recorded, the storeNum matches {(newObj.search())[0]}",

"statCode": 201

}

```

or some forms of JSON if fails according to the error, like unknown error happens:

```json

{

"msg": "Unkown Error 500: storeNum:{storeNum} was not recorded, the storeNum doesn't match {(newObj.search())[0]}",

"statCode": 500

}

```

  

<hr>

  

##### PUT'/storeNum/'

- This route will update the number of the store in the database using the following body:

  

```json

{

"storeNum":"value"

}

```

  

, and returns if success:

```json

{

"msg":"Success 200: storeNum:{storeNum} is updated, old data:{result}, new data:{newObj.search()}",

"statCode": 200

}

```

or some form of JSON if fails according to the error, like if the number was not found:

```json

{

"msg": "Error 404: storeNum:{storeNum} was not updated because it didn't have a record before (maybe first time adding?) ",

"statCode": 404

}

```

<hr>
  

##### DELETE'/storeNum/'

- This route will delete the number of the store in the database:

  

```json

{

"storeNum":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 204: store number is deleted successfully", "statCode": 204}

```

or some form of JSON if fails according to the error, like if the number was not found:

```json

{

"msg": "Error 404: storeNum:{result} was not found, it may not exist",

"statCode": 404

}

```


<hr>
  

##### GET'/storeNum/show'

- This route will return the store number as:

  

```json

{

"storeNum":"value"

}

```

and if there's no number for the store it will return:

```json

{

"storeNum":"none/لايوجد"

}

```



<hr>


##### POST'/storeTheme'

- This route will add a theme for the store in the database using the following body:

  

```json

{

"storeTheme":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 201: storeTheme:{storeTheme} is recorded, the storeTheme matches {(newObj.search())[0]}",

"statCode": 201

}

```

or some forms of JSON if fails according to the error, like if an unknown error happens:

```json

{

"msg": "Unkown Error 500: storeTheme:{storeTheme} was not recorded, the storeTheme doesn't match {(newObj.search())[0]}",

"statCode": 500

}

```

  


<hr>

  

##### PUT'/storeTheme/'

- This route will update the theme of the store in the database using the following body:


```json

{

"storeTheme":"value"

}

```

  

and returns if success:

```json

{

"msg":"Success 200: storeTheme:{storeTheme} is updated, old data:{result}, new data:{newObj.search()}",

"statCode": 200

}

```

or some forms JSON if fails according to the error, like if the id was not found:

```json

{

"msg": "Error 404: storeTheme:{storeTheme} was not updated because it didn't have a record before (maybe first time adding?) ",

"statCode": 404

}

```

<hr>
  

##### DELETE'/storeTheme/'

- This route will delete the theme of the store in the database:

  

```json

{

"storeTheme":"value"

}

```

  

, and returns if success:

```json

{

"msg": "Success 204: store name is deleted successfully", "statCode": 204}

```

or some forms JSON if fails according to the error, like if the name was not found:

```json

{

"msg": "Error 404: storeTheme:{result} was not found, it may not exist",

"statCode": 404

}

```

<hr>
  

##### GET'/storeTheme/show'

- This route will return the store theme as:

  

```json

{

"storeTheme":"value"

}

```

and if there's no theme selected for the store it will return:

```json

{

"storeTheme":"none/لايوجد"

}

```

<hr>


## Frontend
There are 8 `HTML` files in `app/templates` folder 5 of them are pages for [Error Handling and Status Codes](#error-handling-and-status-codes) and the other 3 is the main pages with 3 `CSS` files and 3 `JavaScript` files:
- main.html
	- in this page, all products which been added by admin will be shown to the customer:
	![main.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/menu.png "menu")
![main.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/cart.png "cart")

- admin.html
	- in this page, admin can add, delete, or updates products and promocodes, and can change the name and WhatsApp number of their store:
	![admin.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/leadings.png "leading")
	![admin.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/storeInfo.png "store info")
	![admin.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/products.png "products")
	![admin.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/promocodes.png "promocodes")
- login.html
	- in this page, the admin can verify their identity by providing `<username>` and `<password>` , then via `/verify/<username>/<password>` route, the user will be verified:
	![login.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/login.png "login")

#### Additional UI Features
- The frontend follows a fully responsive design, below are examples of some pages in an **1170×2532** iOS device:
![main.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/menuIOS.jpg "menu in iOS")
![main.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/cartIOS.jpg "cart in iOS")
![admin.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/dbIOS.jpg "dashboard in iOS")
![login.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/loginIOS.jpg "login in iOS")

- A loading spinner will be shown in every page for short time to make the content load smoothly:
![loading spinner](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/loading.png "loading spinner")

- Below are some error pages that will be shown to the user:
![err404.html](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/err404.png "cc: Error404: Page you're looking for doesn't exits")
![err401](https://raw.githubusercontent.com/BR19-gh/online-store-billing-system/master/imgs%20for%20github/err401.png "cc: Error401: Unauthrized access")


## Updates
### Update 2.0v
Now the store owner can change the store theme! 
There are 5 themes for now (red 🔴, blue 🔵, grey ⚫⚪, green 🟢 and original "yellow" 🟡), more will be added later:

![Themes Section](https://github.com/BR19-gh/online-store-billing-system/blob/master/imgs%20for%20github/themes.jpg "cc: store theme")
