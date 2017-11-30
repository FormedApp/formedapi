"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const database_1 = require("./config/database"); // get db config file
const port = process.env.PORT || 8081;
const cors = require("cors");
const AuthController = require("./controllers/authentication.controller");
const PassportAuthController = require("./controllers/passportAuth.controller");
const ActivityController = require("./controllers/activity.controller");
const GroupController = require("./controllers/group.controller");
const PostController = require("./controllers/post.controller");
const RoleController = require("./controllers/role.controller");
const ScriptureController = require("./controllers/scripture.controller");
const TrackController = require("./controllers/track.controller");
/**
 * Create Express server.
 */
const app = express();
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log to console
app.use(morgan("dev"));
app.use(cors());
// Use the passport package in our application
app.use(passport.initialize());
// demo Route (GET http://localhost:8080)
app.get("/", (res) => {
    res.send("Hello! The API is at http://localhost:" + port + "/api");
});
// Start the server
app.listen(port);
console.log("There will be dragons: http://localhost:" + port);
// connect to database
mongoose.connect(database_1.config.database);
// bundle our routes
const apiRoutes = express.Router();
app.use("/api", apiRoutes);
apiRoutes.get("/activities", PassportAuthController.isAuthenticated, ActivityController.getActivities);
apiRoutes.get("/activities/:id", PassportAuthController.isAuthenticated, ActivityController.getActivity);
apiRoutes.post("/activities", PassportAuthController.isAuthenticated, ActivityController.addActivity);
apiRoutes.delete("/activities/:id", PassportAuthController.isAuthenticated, ActivityController.deleteActivity);
apiRoutes.post("/signup", AuthController.signup);
apiRoutes.post("/authenticate", AuthController.authenticate);
apiRoutes.get("/groups", PassportAuthController.isAuthenticated, GroupController.getGroups);
apiRoutes.get("/groups/:id", PassportAuthController.isAuthenticated, GroupController.getGroup);
apiRoutes.post("/groups", PassportAuthController.isAuthenticated, GroupController.addGroup);
apiRoutes.delete("/groups/:id", PassportAuthController.isAuthenticated, GroupController.deleteGroup);
apiRoutes.get("/post", PassportAuthController.isAuthenticated, PostController.getPosts);
apiRoutes.get("/post/:id", PassportAuthController.isAuthenticated, PostController.getPost);
apiRoutes.post("/post", PassportAuthController.isAuthenticated, PostController.addPost);
apiRoutes.delete("/post/:id", PassportAuthController.isAuthenticated, PostController.deletePost);
apiRoutes.get("/roles", PassportAuthController.isAuthenticated, RoleController.getRoles);
apiRoutes.get("/roles/:id", PassportAuthController.isAuthenticated, RoleController.getRole);
apiRoutes.post("/roles", PassportAuthController.isAuthenticated, RoleController.addRole);
apiRoutes.delete("/roles/:id", PassportAuthController.isAuthenticated, RoleController.deleteRole);
apiRoutes.get("/scriptures", PassportAuthController.isAuthenticated, ScriptureController.getScriptures);
apiRoutes.get("/scriptures/:id", PassportAuthController.isAuthenticated, ScriptureController.getScripture);
apiRoutes.post("/scriptures", PassportAuthController.isAuthenticated, ScriptureController.addScripture);
apiRoutes.delete("/scriptures/:id", PassportAuthController.isAuthenticated, ScriptureController.deleteScripture);
apiRoutes.get("/tracks", PassportAuthController.isAuthenticated, TrackController.getTracks);
apiRoutes.get("/tracks/:id", PassportAuthController.isAuthenticated, TrackController.getTrack);
apiRoutes.post("/tracks", PassportAuthController.isAuthenticated, TrackController.addTrack);
apiRoutes.delete("/tracks/:id", PassportAuthController.isAuthenticated, TrackController.deleteTrack);
//# sourceMappingURL=server.js.map