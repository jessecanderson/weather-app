// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require("express");
const parser = required("body-parser");

// Start up an instance of app
const app = express();
const port = 3000;

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance

// Initialize the main project folder

// Spin up the server
// Callback to debug
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", function (req, res) {
  res.send("Get all method called");
});

// Post Route
app.post("/", function (req, res) {});
