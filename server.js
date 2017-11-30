const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database"); // get db config file
const port = process.env.PORT || 8081;
const jwt = require("jwt-simple");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");
const cuid = require('cuid');

// Routes
const TrackRoutes = require('./app/routes/track.routes');
const PostRoutes = require('./app/routes/post.routes');
const ActivityRoutes = require('./app/routes/activity.routes');
const GroupRoutes = require('./app/routes/group.routes');
const RoleRoutes = require('./app/routes/role.routes');
const ScriptureRoutes = require('./app/routes/scripture.routes');
const UserRoutes = require('./app/routes/user.routes');
const AuthenticationRoutes = require('./app/routes/authentication.routes');

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

app.use('/api', ActivityRoutes);
app.use('/api', GroupRoutes);
app.use('/api', PostRoutes);
app.use('/api', RoleRoutes);
app.use('/api', ScriptureRoutes);
app.use('/api', TrackRoutes);
app.use('/api', AuthenticationRoutes);
