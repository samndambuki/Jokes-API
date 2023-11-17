//middleware/dependencies
const express = require("express");

//parse json when it comes in through requests
const bodyParser = require("body-parser");

//security
const cors = require("cors");

const app = express();

const port = 3000;

let jokes = [
  { id: 1, joke: "This is joke 1" },
  { id: 2, joke: "This is joke 2" },
  { id: 3, joke: "This is joke 3" },
  { id: 4, joke: "This is joke 4" },
  { id: 5, joke: "This is joke 5" },
  { id: 6, joke: "This is joke 6" },
];

//enable cors for all requests that come in
app.use(cors());

//enabling body parser to parse json objects into js objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//define the root entry point  for the REST API
app.get("/", (req, res) => {
  res.send("Welcome to the jokes REST API.Visit /jokes to see the list");
});

//define a route to retrieve all jokes
app.get("/jokes", (req, res) => {
  res.send(jokes);
});

//define a route to retrieve a random joke
app.get("/randomjokes", (req, res) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(joke);
});

//define a route to add a new joke
app.post("/jokes", (req, res) => {
  //generate a new id for the joke
  const newId = jokes[jokes.length - 1].id + 1;

  //get the joke from the request body

  const joke = req.body;

  //output the joke to the console for debugging
  console.log(joke);
  jokes.push({ id: newId, joke: joke });

  //res.send("a new joke has been added to the array")

  res.send({ id: newId, joke: joke });
});

//define a route to delete a joke
app.delete("/jokes/:id", (req, res) => {
  //get joke id from  request parameters
  const jokeId = req.params.id;

  //find the joke with the matching id

  const jokeIndex = jokes.findIndex((joke) => joke.id == jokeId);

  ///remove the joke from the array
  jokes.splice(jokeIndex, 1);

  //send a message as a response
  res.send({ message: "Joke deleted successfully" });
});

//start the rest api server
app.listen(port, () => console.log(`Jokes API listening on port ${port}`));
