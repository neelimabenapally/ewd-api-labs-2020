# Assignment 2 - Web API.

Name: Neelima Benapally

## Overview

The Web API is the backend of the media-fanpage. This fetches all the details required by the frontend from either talking to TMDB API or to the MongoDB and sends the responses to the frontend.


## Installation Requirements

**PreRequisites**
..* npm
..* mongo DB
..* Node v10 + 
..* NVM v6+


Getting/installing the software:

```bat
git clone https://github.com/neelimabenapally/server-app.git
```

followed by installation

```bat
cd starter
npm i
```

## API Configuration

Install dotenv : npm install dotenv --save

Create a new file in your application root folder called .env and add the following content:
```bat
NODE_ENV = development
PORT = 8080
HOST = localhost
mongoDB = <YourMongoURL>
TMDB_KEY = <TMDBKey>
AUTH0_TEST_TOKEN=<AUTH0_TOKEN>
```

## Startup

**Start API:**
npm start-dev (for local development)

**Start Unit Testing:**
npm run unit-test

**Start Integration Testing:**
npm run test

## API Design
Give an overview of your web API design. If you don't have a Swagger description, you could describe similar to the following: 

|   |  GET | POST | PUT | DELETE |
| :---:  |:----: | :---: | :---: | :---: | :---: |
| /api/listing/:type |Gets a list of movies or series | N/A | N/A | N/A|
| /api/listing/:type/view/:typeid | Get a Movie or series details and cast| N/A | N/A | N/A |
| /api/listing/:type/filter_sort/:genre/:sort_by | Get a list of movies or series based on sorting and filtering| N/A | N/A | N/A  |
| /api/listing/:type/filter_sort/:genre/ |Get a list of movies or series based on filtering | N/A | N/A | N/A |
| /api/listing/similar/:type/:id |Gets a list of movies or series similar to the selected item | N/A | N/A | N/A |
| /api/genres/:type |Gets genres for movies or series | N/A | N/A | N/A |
| /api/favourites/:username/:type |Gets favourite movies or series | N/A | N/A | N/A |
| /api/favourites/:type/:id | N/A | Adds a movie or series to favourites | N/A | Removes movie or series from favourites |
| /api/users | N/A | Register or Login a user | N/A | N/A |
| /api/reviews/:type/:id | Gets reviews for a movie or series | Updates or Adds reviews for a movie or series | N/A |  N/A |

## Security and Authentication
Auth0 is used for authentication of the user. Following are the protected routes:
..* POST /api/favourites/:type/:id
..* GET /api/favourites/:username/:type
..* GET /api/listing/:type/view/:id
..* GET /api/listing/:type/filter_sort/:genre/:sort_by
..* GET /api/listing/:type/filter_sort/:genre
..* GET /api/listing/:type
..* GET /api/listing/similar/:type/:id
..* GET /api/genres/:type
..* POST /api/reviews/:type/:id
..* GET /api/reviews/:type/:id

## Testing

Checks unit and integration testing of the app.
![Integration Testing][tests]

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

The frontend (React App) uses the server url (http://localhost:8080 - controlled via an env var) where the backend runs to communicate with the backend.

React App Repo: https://github.com/neelimabenapally/client-app.git

~~~Javascript
export const listingRouter = () => {
  return fetch(
    router.get('/:type', (req, res) => {
    getListing(req.params.type)
    .then((items) => res.status(200).send(items));
});
};

~~~

## Extra features

Auth0 is used for the authentication and sign up of the users. Auth0 handles social login and storing of all the sensitive access information

Live Hosting using Heroku

## Independent learning.

Auth0
Heroku

[tests]: ./Reporting-Tests-Images/ReportingTool.png
