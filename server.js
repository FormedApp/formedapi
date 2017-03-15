const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database"); // get db config file
const User = require("./app/models/user"); // get the mongoose model
const Track = require("./app/models/track");
const port = process.env.PORT || 8080;
const jwt = require("jwt-simple");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");
const cuid = require('cuid');

// Routes
const TrackRoutes = require('./app/routes/track.routes');
const PostRoutes = require('./app/routes/post.routes');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan("dev"));
app.use(cors());

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get("/", function(req, res) {
  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

// Start the server
app.listen(port);
console.log("There will be dragons: http://localhost:" + port);

// connect to database
mongoose.connect(config.database);


// bundle our routes
var apiRoutes = express.Router();

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post("/signup", function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({ success: false, msg: "Please fill out the complete form." });
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

// connect the api routes under /api/*
app.use("/api", apiRoutes);

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post("/authenticate", function(req, res) {
  User.findOne(
    {
      name: req.body.name
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Get the list of all the users. (only for authenticated users.)

apiRoutes.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne(
        {
          name: decoded.name
        },
        function(err, user) {
          if (err) throw err;

          if (!user) {
            return res.status(403).send({
              success: false,
              msg: "Authentication failed. Wrong user."
            });
          } else {
            // User authenticated, get the list of all the users.

            User.find(function(err, user) {
              if (err) throw err;

              if (!user) {
                return res.status(403).send({
                  success: false,
                  msg: "Authentication failed. User not found."
                });
              } else {
                res.json({ success: true, msg: user });
              }
            });
          }
        }
      );
    } else {
      return res
        .status(403)
        .send({ success: false, msg: "No token provided." });
    }
  }
);


app.use('/api/tracks', TrackRoutes);
app.use('/api/posts', PostRoutes);
