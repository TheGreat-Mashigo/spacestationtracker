var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var axios = require("axios");

app.get("/location", function (req, res) {
  axios
    .get("http://api.open-notify.org/iss-now.json")
    .then((response) => {
      console.log(response);
      res.json({
        success: "get call succeed!",
        url: req.url,
        location: response.data
      });
    })
    .catch((err) => {
      res.json({ error: true });
    });
});

app.get("/item", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});


app.post("/coordinates", function (req, res) {
  console.log(req)
  const tableName = "spacetable";
  const timestamp = new Date().toISOString();
  const query = request.query;
  let params = {
    TableName: tableName || process.env.STORAGE_DYNAMODB_NAME,
    Item: {
      ...request.body,
      id: uuidv4(),               // auto-generate id
      createdAt: timestamp,
      updatedAt: timestamp,
      iss_position: 
        { 
          "longitude": query.iss_position.longitude, 
          "latitude": query.iss_position.latitude
        }, 	
      timestamp: query.time, 
      message: query.message
    }
  }
  dynamodb.put(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(params.Item) })
    }
  });
});

app.post("/item", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/item", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/item", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
