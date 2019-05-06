# Bikeshare
App for showing availability of bikes at stations in a bikeshare system based on General Bikeshare Feed Specification.

The app is built in Node/Express and React using the React framework [Next.js](https://nextjs.org/)

No api key is used since Oslo's bikeshare API seems to be open anyway and I found no way to register, but a 'client-name' header is provided with each request to the api.

The error handling is simply rendering a general error message to the user if there are any exceptions in the fetching or handling of the api data.

### Requirements 
node 8.x or higher

### Tests
Tests are written with jest and enzyme - some unit tests and some enzyme tests for testing the rendering. API calls are mocked.

### Config
The api auto discovery url and the client-name header can if desired be configured in ~/config.js before the app is built.

### Install
clone the repository

navigate to the top folder of the app

npm install

npm run build

### Running tests
npm test

### Usage
npm start

The app will then be available on localhost:3000 (or localhost:3000/availability)
