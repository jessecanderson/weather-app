// Setup empty JS object to act as endpoint for all routes
projectData = {};

const weatherApiKey = "daa8a9e8325a75abf5b6b16a74e55b42";

// Require Express to run server and routes
const express = require("express");
const request = require("request");
const cors = require("cors");

// Start up an instance of app
let app = express();
let port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
// Body Parser was being marked as deprecated, this fixed the issue
// Express >= 4.16.0, body parser has been re-added
// Reference https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance

var corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

// Initialize the main project folder
app.use(express.static("website"));

// Helper methods for API weather call
async function getWeatherData(url) {
  return new Promise((resolve, reject) => {
    const options = {
      url: url,
      headers: {
        "Content-Type": "text/plain",
      },
    };
    request(options, (error, response, body) => {
      if (error) reject(error);
      if (response.statusCode != 200) {
        reject("Invalid status code: " + response.statusCode);
      }
      resolve(body);
    });
  });
}

async function updatePostWithWeather(post) {
  let zip = post.zipcode;
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${weatherApiKey}`;
  return new Promise((resolve, reject) => {
    try {
      getWeatherData(url).then((response) => {
        const weatherData = JSON.parse(response);
        const postWithWeather = { post: post, weather: weatherData };
        projectData = postWithWeather;
        posts.push(postWithWeather);
        console.log(postWithWeather);
        resolve(postWithWeather);
      });
    } catch (error) {
      console.error("Error: " + error);
    }
  });
}

// Setup Server

var posts = [];

app.get("/entries", function (req, res) {
  res.send(projectData);
});

// JSON parsing in Express 4.16+
// https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application

app.post("/add", function (req, res) {
  console.log(JSON.stringify(req.body));
  updatePostWithWeather(req.body).then((weatherPost) => {
    res.status(200).send(weatherPost);
  });
});

app.listen(port, function () {
  console.log(`listening on port: ${port}`);
  // fetch("32303");
});
