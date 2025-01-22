//Connecting to require packages
const express = require('express');
const bodyParser = require('body-parser');
 
//Creatiing an Express App
const app = express();

//Adding 2 middlewares for the request and response
app.use(bodyParser.urlencoded({ extended: true}))

app.use(bodyParser.json())

//Importing Database from the MongoDB Server
const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser : true
}) .then(() => {
    console.log("Database Connected Successfully!!");
}) .catch( err => {
    console.log('Could not connect to the database', err);
    process.exit();
})

//Creating API for res, req
app.get('/', (req, res) => {
    res.json({ "message": "Hello Crud Node Express"});
});

//Listening API from the server on port 3000, returning the messge from API
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})

// Adding user route to server.js
const UserRoute = require('./app/routes/User')
app.use('/user',UserRoute)

