// const forecast = require("./utils/forecast");
// const app = require('express')()

// let address;

// if (process.argv[3] === undefined) {
//   address = process.argv[2];
// } else {
//   address = (process.argv[2] + " " + process.argv[3])
//     .split(" ")
//     .join("%20")
//     .trim();
// }

// if (!address) {
//   console.log("Enter city name please!");
// } else {
//   forecast(address, (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(
//       `Location: ${data.body.location.name}, ${data.body.location.region}, ${data.body.location.country}`
//     );
//   });
// }
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");

app.use(express.static(path.join("public")));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  forecast(req.query.address, (error, { body } = {}) => {
    if (error) {
      return res.send({ error });
    }
    res.send(body);
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    errorMessage: "404: NOT FOUND ABOUT PAGE",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404: NOT FOUND PAGE",
  });
});

app.listen(5000, () => console.log("Server is up and running"));
