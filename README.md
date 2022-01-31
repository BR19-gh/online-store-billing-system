# Online Store Billing System

---------------------------------------------

## Overview
A fullstack online store model that gives the store owner the ability of adding products and their prices, the ability of adding promocodes which their customers can use and the ability of a customer to send their bill to owner's WhatsApp,. The store uses Flask as its backend, PostgreSQL as database, and CSS, HTML and JS as its frontend.


The application is deployed on Heroku and can be accessed at <br> [http://onlinestore.br19.me](http://onlinestore.br19.me/)

  

## Project Dependencies

### Python 3.7

  

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

It will take you to a page with login info for all the roles which will be mentioned bellow

  

### Virtual Enviornment

*  **virtualenv** as a tool to create isolated Python environments

* It is recommended to work with a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized.

* Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

  

### Installing Dependencies

  

Once you have your virtual environment setup and running, install dependencies by running:

  

```bash

pip install -r requirements.txt

```

  

This will install all of the required packages as mentioned within the `requirements.txt` file.
  

### Key Dependencies

  

-  [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

  

-  [SQLAlchemy](https://www.sqlalchemy.org/) and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) are libraries to handle the lightweight sqlite database. `app.py` is the entrypoint of the application and database models can be referenced in `models.py`

  

-  [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/) for creating and running schema migrations

  

-  [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server.

  

-  [jose](https://python-jose.readthedocs.io/en/latest/) JavaScript Object Signing and Encryption for JWTs. Useful for encoding, decoding, and verifying JWTS.

  

-  [pycodestyle](https://pypi.org/project/pycodestyle/) pycodestyle is a tool to check Python code against PEP 8 coding styleguide.

  

## Database Setup

*  **PostgreSQL** is the database for this project

* start postgres server and login to postgres

```bash

service postgresql start

sudo -u <username> -i

```

* create two databases, one for development and the other for testing

```bash

createdb casting-agency

createdb casting-agency-test

```

  

### Environment variables

* Run the setup file to create the environment variables.

* Note: Before running the script, please update the DATABASE_URL as needed based on your local postgres setup.

```bash

source setup.sh

```

  

### Setup initial db and seed data

* Run the following commands from the project directory to setup the initial database using migration files

```bash

python manage.py db init

python manage.py db upgrade

```

* Populate db tables with seed data:

```bash

python manage.py seed

```

  

## Running the server

  

* From within the project directory first ensure you are working using your created virtual environment.

* Run the setup file to create the environment variables.

*  **Note**: The `setup.sh` will create DATABASE_URL, AUTH0 and FLASK_APP related environment variables.

  

```bash

source setup.sh

```

  

To run the development server, execute:

  

```bash

flask run

```
or in PowerShell for Windows

```powershell

$env:FLASK_APP = "yourappname.py"
$env:FLASK_ENV = "development"
flask run

```

  

## Authentication

### Setup Auth0

1. Create a new Auth0 Account

2. Select a unique tenant domain

3. Create a new, single page web application

4. Create a new API

	- in API Settings:

	- Enable RBAC

	- Enable Add Permissions in the Access Token

5. Create new API permissions:

	-  `get:actors`

	-  `get:movies`

	-  `post:actors`

	-  `post:movies`

	-  `patch:actors`

	-  `patch:movies`

	-  `delete:actors`

	-  `delete:movies`

6. Create new roles for:

- Public

	- No Access

- Casting Assistant

	- can view only actors and movies

	- Permission: `get:actors`, `get:movies`

- Casting Director

	- can do all actions as performed by Casting Assistant

	- can also add or delete an actor from the database

	- can also modify actors or movies

	- Permission: `get:actors`, `get:movies`, `post:actors`, `patch:actors`, `delete:actors`, `patch:movies`

- Executive Producer

	- can do all actions as performed by Casting Director

	- additionally can also add or delete a movie from the database

	- Permission: `get:actors`, `get:movies`, `post:actors`, `post:movies`, `patch:actors`, `patch:movies`, `delete:actors`, `delete:movies`

7. Test endpoints with below registered users:

	- Register 3 users - assign the Assistant role, Director role and Producer role to each user respectively.

  
  

## API Reference

Users need to be authenticated via Auth0 to avail the Casting Agency API service. JWT Tokens will be generated after successful authentication.

The users will be granted access to the API endpoints based on the permissions in the JWT payload data.

  

### Getting Started

- Base URL: This app can be run locally at the default URL `http://127.0.0.1:5000/`

- External URL: The app is also hosted on Heroku and can be accessed at [https://br19-capstone-project.herokuapp.com/](https://br19-capstone-project.herokuapp.com/)

- Authentication: This version of the application supports authentication and authorization using Auth0.

  

### Error Handling

The API will return the following error codes when requests fail:

- 400: Bad Request

- 400: Permissions not included in JWT

- 400: Unable to parse authentication token

- 400: Unable to find the appropriate key

- 401: unauthorized

- 401: Authorization header is expected

- 401: Authorization header must start with "Bearer

- 401: Token not found

- 401: Authorization header must be bearer token

- 401: Authorization malformed

- 401: Token expired

- 401: Incorrect claims. Please, check the audience and issuer

- 403: permission not found

- 404: Resource Not Found

- 422: Not Processable

- 500: Internal Server Error

  

An example of 401 error due to RBAC returned as JSON objects in the following format:

```

{

"error": 401,

"message": {

"code": "authorization_header_missing",

"description": "Authorization header is expected."

},

"success": false

}

```

  

Other errors are returned as JSON objects in the following format:

```

{

"success": False,

"error": 400,

"message": "bad request"

}

```

  

### API Endpoints

  

* Before running the commands, please remember to update the ACCESS_TOKEN placeholder with valid JWT token

  

#### GET '/movies'

- General:

- Returns a list of movies.

- Authorized Roles: Casting Assistant, Casting Director, Executive Producer.

- Required permission: get:movies

- Sample: `curl -X GET http://127.0.0.1:5000/movies -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN"`

  

```

{

"movies": [

{

"id": 1,

"release_date": "Wed, 16 Dec 2020 00:00:00 GMT",

"title": "Wonder Woman 1984"

},

{

"id": 2,

"release_date": "Fri, 05 Feb 2021 00:00:00 GMT",

"title": "Space Sweepers"

},

{

"id": 3,

"release_date": "Thu, 19 Dec 2019 00:00:00 GMT",

"title": "Star Wars: The Rise of Skywalker (Episode IX)"

},

{

"id": 4,

"release_date": "Thu, 15 May 2003 00:00:00 GMT",

"title": "The Matrix Reloaded"

},

{

"id": 5,

"release_date": "Tue, 21 May 2019 00:00:00 GMT",

"title": "Parasite"

}

],

"success": true

}

  

```

  

#### GET '/movies/<int:id>'

- General:

- This route returns the movie with specified movie id.

- Authorized Roles: Casting Assistant, Casting Director, Executive Producer.

- Required permission: get:movies

- Sample: `curl -X GET http://127.0.0.1:5000/movies/1 -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN"`

  

```

{

"movie": {

"id": 1,

"release_date": "Wed, 16 Dec 2020 00:00:00 GMT",

"title": "Wonder Woman 1984"

},

"success": true

}

  

```

  

#### POST '/movies'

- General:

- Creates a new new movie using json request parameter - title and release_date.

- Authorized Roles: Executive Producer.

- Required permission: post:movies

- Sample: `curl -X POST http://127.0.0.1:5000/movies -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN" -d '{"title": "The White Tiger", "release_date": "2021-01-22"}'`

  

```

{

"movie": {

"id": 6,

"release_date": "Fri, 22 Jan 2021 00:00:00 GMT",

"title": "The White Tiger"

},

"success": true

}

```

  

#### PATCH '/movies/<int:id>'

- General:

- Patches the movie of the given ID if it exists. Returns the id of the movie and success value.

- Authorized Roles: Casting Director, Executive Producer.

- Required permission: patch:movies

- Sample: `curl -X PATCH http://127.0.0.1:5000/movies/2 -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN" -d '{"title": "Space Sweepers Victory", "release_date": "2021-02-05"}'`

  

```

{

"movie": [

{

"id": 2,

"release_date": "Fri, 05 Feb 2021 00:00:00 GMT",

"title": "Space Sweepers Victory"

}

],

"success": true

}

  

```

  

#### DELETE '/movies/<int:id>'

- General:

- Deletes the movie of the given ID if it exists. Returns the id of the deleted movie and success value.

- Authorized Roles: Executive Producer.

- Required permission: delete:movies

- Sample: `curl -X DELETE http://127.0.0.1:5000/movies/6 -H "Authorization: Bearer ACCESS_TOKEN"`

  

```

{

"delete": 6,

"success": true

}

```

  

#### GET '/actors'

- General:

- Returns a list of actors.

- Authorized Roles: Casting Assistant, Casting Director, Executive Producer.

- Required permission: get:actors

- Sample: `curl -X GET http://127.0.0.1:5000/actors -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN"`

  

```

{

"actors": [

{

"age": 58,

"gender": "male",

"id": 1,

"name": "Tom Cruise"

},

{

"age": 45,

"gender": "female",

"id": 2,

"name": "Angelina Jolie"

},

{

"age": 64,

"gender": "male",

"id": 3,

"name": "Tom Hanks"

},

{

"age": 71,

"gender": "female",

"id": 4,

"name": "Meryl Streep"

},

{

"age": 53,

"gender": "female",

"id": 5,

"name": "Nicole Kidman"

}

],

"success": true

}

  

```

  

#### GET '/actors/<int:id>'

- General:

- This route returns the actor with specified actor id.

- Authorized Roles: Casting Assistant, Casting Director, Executive Producer.

- Required permission: get:actors

- Sample: `curl -X GET http://127.0.0.1:5000/actors/1 -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN"`

  

```

{

"actor": {

"age": 58,

"gender": "male",

"id": 1,

"name": "Tom Cruise"

},

"success": true

}

```

  

#### POST '/actors'

- General:

- Creates a new actor using json request parameter - name, age and gender.

- Authorized Roles: Casting Director, Executive Producer.

- Required permission: post:actors

- Sample: `curl -X POST http://127.0.0.1:5000/actors -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN" -d '{"name": "Brad Pitt", "gender": "male", "age": 65}'`

  

```

{

"actor": {

"age": 65,

"gender": "male",

"id": 6,

"name": "Brad Pitt"

},

"success": true

}

```

  

#### PATCH '/actors/<int:id>'

- General:

- Patches the actor data if it exists. Returns the id of the actor and success value.

- Authorized Roles: Casting Director, Executive Producer.

- Required permission: patch:actors

- Sample: `curl -X PATCH http://127.0.0.1:5000/actors/6 -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN" -d '{"name": "Brad Pitt BP", "gender": "male" , "age": 55}'`

  

```

{

"actor": [

{

"age": 55,

"gender": "male",

"id": 6,

"name": "Brad Pitt BP"

}

],

"success": true

}

```

  

#### DELETE '/actors/<int:id>'

- General:

- Deletes the actor with the specified ID if it exists. Returns the id of the deleted actor and success value.

- Authorized Roles: Casting Director, Executive Producer

- Required permission: delete:actors

- Sample: `curl -X DELETE http://127.0.0.1:5000/actors/6 -H "Authorization: Bearer ACCESS_TOKEN"`

  
  

```

{

"delete": 6,

"success": true

}

```

  

## Testing

* From within the project directory first ensure you are working using your created virtual environment.

* Run the setup file to create the environment variables (if not already run in the precceding section).

*  **Note**: The `setup.sh` will export TEST_DATABASE_URL, Test JWT token for each user as environment variables.

  

```bash

source setup.sh

```

Run the unittest using below command

```

python test_app.py

```
