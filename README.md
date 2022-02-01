
# Online Store Billing System

 
## Overview

A full-stack online store model that gives the store owner the ability to add products and their prices, the ability to add promocodes which their customers can use, and the ability of a customer to send their bill to the owner's WhatsApp, The store uses Flask as its backend, PostgreSQL as database, and CSS, HTML, and JS as its frontend.

The application is deployed on Heroku and can be accessed at <br>  [https://br19-capstone-project.herokuapp.com/](https://br19-capstone-project.herokuapp.com/)

  
## Running the Project Locally
  

### Project Dependencies
<hr>

  

#### Python 3.9.10

  

  

Install Here: [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)
<hr>
  

  

#### Virtual Enviornment

  

*  **virtualenv** as a tool to create isolated Python environments

  

* It is recommended to work with a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized.

  

* Instructions for setting up a virtual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
<hr>
  

  

#### Installing Dependencies

  

  

Once you have your virtual environment setup and running, install dependencies by running:

  

  

```bash

  

pip install -r requirements.txt

  

```

  

  

This will install all of the required packages as mentioned within the `requirements.txt` file.

  

#### Key Dependencies

  

  

-  [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

  

  

  

  

-  [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension to use for handling cross-origin requests from our frontend server when running the project locally.
	- after installing this dependency, uncomment the following line in `app/main.py` for the app to work locally:
	``` python
	# cors = CORS(app)
	```

  

  
  <hr>

  

### Database Setup

  
  **SQLite** is the database for this project

  
* `spdb.db` is database file for local running
	* PostgreSQL is the database for production enviromnt, because of that, you have to comment out this line of code in all of `app/main.py`:
		``` python
		self.conn  =  psycopg2.connect(DATABASE_URL, sslmode='require')
		```
		and uncomment the following line in all `of app/main.py`:
		``` python
		# self.conn = sqlite3.connect("spdb.db")
		```
		for database connections to work locally

  

### Environment variables

  

* Create .env file in the root directory and put the following values in:
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

  

  

### API Reference
  

  

#### Getting Started

  

- Base URL: This app can be run locally at the default URL `http://127.0.0.1:5000/`

  

- External URL: The app is also hosted on Heroku and can be accessed at [http://onlinestore.br19.me](http://onlinestore.br19.me/)


  

  

#### Error Handling and Status Codes

  

The API will return the following error codes and status codes
 when requests failorsuccesss:

 - 200: Entity is Updated

- 201: Entity is Created

- 202:  Accepted for Processing

 - 204: Deleted Successfully or No Content to Return

- 400: Bad Request


- 401: Unauthorized


- 403: Entity Exists
  

- 404: Resource Not Found

  

- 405: Method Used Not Allowed


- 429: Rate-Limit of Requests Exceeded


- 500: Internal Server Error


- 503: Server is Down Due to Maintenance
  

  

An example of 401 error due to PASSWORD and USERNAME not provided by the frontend not matching what is in env:

  

```python
msg  =  '{"msg": f"Error 401: unauthrized access", "statCode": 401}'
return  render_template('err/err401.html', msg=msg) # it will render 401 error page and pass msg to be consuled in frontend
```

  

  

Other errors and status codes are returned as JSON objects in the following format:

  

```json
{"msg": "Bad Request 400: storeNum was not updated, even the provided storeNum is not integer, or it contains illegal form of characters", "statCode": 400}
```

  

  

#### API Endpoints


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

##### GET '/verfiy/&lt;username&gt;/&lt;password&gt;'


- Checks if username  =  USERNAME in env  and  password  =  PASSWORD in env then redirect to `app/templates/admin.html`.
  


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
{"0":{
	"amount":0.5,
	"code":"promo1",
	"id":1
	},
"1":{
	"amount":0.3,'
	"code":"promo2",
	"id":2
	}
}
```

  

<hr>  

##### POST'/product'
- This route will add a product to the database using the following header:
 ```json
 {
	 "id" : "value",
	 "title" : "value1",
	 "price" : "value2",
	 "img" : "value3 /* an image in form of base64 encoding */"
 }
 ```
and returns if success:
```json
{
"msg": "Success 201: product_id:{id} is recorded, ...", 
"statCode": 201
}
```
or some forms of JSON if fails according to the error, like if the body was not formed correctly:
```json
{
"msg": "Bad Request 400: product was not added, ...",
"statCode": 400
}
```
  
  <hr>  

##### PUT'/product/&lt;int:idIn&gt;'
- This route will update a product in the database using the following header:
 ```json
 {
	 "title" : "value1",
	 "price" : "value2",
	 "img" : "value3 /* an image in form of base64 encoding */"
 }
 ```
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
- This route will get a product in the database using the `id` to check if it can be added, and returns if successful:
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
	 "id"  =  "value",
	 "code"  =  "value1",
	 "amount"  =  "value2"
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
	 "code"  =  "value1",
	 "amount"  =  "value2"
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
or some forms of jJSONif fails according to the error, like if the `id` is not found:
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
	or some forms of jJSONif fails according to the error, like if uan unknownerror happens:
	```json
	{
	"msg": "Unkown Error 500: storeName:{storeName} was not recorded, the storeName doesn't match {(newObj.search())[0]}", 
	"statCode": 500
	}
	```

<hr>  

##### PUT'/storeName/&lt;int:idIn&gt;'
- This route will update the name of the store in the database using the following body and the id:

	```json
	{
	"storeName":"value"
	}
	```

	 , and returns if success:
	```json
	{
	"msg":"Success 200: storeName:{storeName} is updated, old data:{result}, new data:{newObj.search()}", 
	"statCode": 200"
	}
	```
	or some forms JSONson if fails according to the error, like if the id was not found:
	```json
	{
	"msg": "Error 404: storeName:{storeName} was not updated because it didn't have a record before (maybe first time adding?) ", 
	"statCode": 404
	}
	```

##### DELETE'/storeName/&lt;int:idIn&gt;'
- This route will delete the name of the store in the database using the id:

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
	or some forms JSONson if fails according to the error, like if the id was not found:
	```json
	{
	"msg": "Error 404: storeName:{result} was not found, it may not exist", 
	"statCode": 404
	}
	```

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
	or some forms JSONson if fails according to the error, like unknownunkown error happens:
	```json
	{
	"msg": "Unkown Error 500: storeNum:{storeNum} was not recorded, the storeNum doesn't match {(newObj.search())[0]}", 
	"statCode": 500
	}
	```

<hr>  

##### PUT'/storeNum/&lt;int:idIn&gt;'
- This route will update the number of the store in the database using the following body and the id:

	```json
	{
	"storeNum":"value"
	}
	```

	 , and returns if success:
	```json
	{
	"msg":"Success 200: storeNum:{storeNum} is updated, old data:{result}, new data:{newObj.search()}", 
	"statCode": 200"
	}
	```
	or some foJSONof json if fails according to the error, like if the id was not found:
	```json
	{
	"msg": "Error 404: storeNum:{storeNum} was not updated because it didn't have a record before (maybe first time adding?) ", 
	"statCode": 404
	}
	```

##### DELETE'/storeNum/&lt;int:idIn&gt;'
- This route will delete the number of the store in the database using the id:

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
	or some foJSONof json if fails according to the error, like if the id was not found:
	```json
	{
	"msg": "Error 404: storeNum:{result} was not found, it may not exist", 
	"statCode": 404
	}
	```

##### GET'/storeNum/show'
- This route will return the store number as:

	```json
	{
	"storeNum":"value"
	}
	```
	and if there's no name for the store it will return:
	```json
	{
	"storeNum":"none/لايوجد"
	}
	```