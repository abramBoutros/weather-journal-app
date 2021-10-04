// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of serverApp
// I named it serverApp instead of the useal to make my code special as much as i can.
// also to check if i can make two instances of express in one node file
// I was an embedded software engineer so I got the Idea to name the variables by the module name.
const serverApp =  express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// I was told in the comunity that express can do the job solo.
// I used express instead of body parser as express now have a built in body pareser
// but I am ok with changing it if that means i didn't fulfil the requirements
serverApp.use(express.urlencoded({ extended: false }));
serverApp.use(express.json());

// I did install axios but it gave me so many errors on the server side so i went old school.  

// Cors for cross origin allowance ( I don't think we need cors for this project ( or even any backend))
const cors = require('cors');
// enable cors requests
serverApp.use(cors());
// Initialize the main project folder
serverApp.use(express.static('website'));

// setup the server port number to a unique number (my fav num is 13) 
const serverPort = 1313;
serverApp.listen(serverPort, () => {console.log(`Server started and running on http://127.0.0.1:${serverPort}`)})

serverApp.get('/getApiData', (req, res) => {
    console.log(projectData);
    console.log('from get');
    res.status(200).send(projectData);
});

serverApp.post('/postApiData', (req ,res) => {
    projectData = req.body;
    console.log(projectData );
    console.log('from post');
    res.status(200).end();
});