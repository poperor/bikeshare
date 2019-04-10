# Bikeshare
The app is built in Node/Express and React using the React framework [Next.js](https://nextjs.org/)
No api key is used since Oslo's bikeshare API seems to be open anyway and I found no way to register, but a 'client-name' header is provided with each request to the api.
The error handling is simply rendering a general error message to the user if there are any exceptions in the fetching or handling of the api data.

### Requirements 
node 8.x or higher

### Config
The api auto discovery url and the client-name header can if desired be configured in ~/config.js before the app is built.

### Install
clone the repository
navigate to the top folder of the app
npm install
npm run build

### Usage
npm start
The app will then be available on localhost:3000 (or localhost:3000/availability)