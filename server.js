// // Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Callback function to complete GET '/all'
app.get('/get', getData)

function getData(request, response) {
    response.send(projectData);
}

// POST method route
app.post('/post', postData)

function postData(request, response) {
    projectData = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    };
    // projectData.push(newData);
    response.send(projectData);
}