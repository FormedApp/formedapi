import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as passport from "passport";
import { config } from "./config/database"; // get db config file
const port = process.env.PORT || 8081;
import * as jwt from "jwt-simple";
import * as cors from "cors";
import * as sanitizeHtml from "sanitize-html";
import * as cuid from "cuid";

import * as AuthController from "./controllers/authentication.controller";
import * as PassportAuthController from "./controllers/passportAuth.controller";
import * as ActivityController from "./controllers/activity.controller";
import * as GroupController from "./controllers/group.controller";
import * as PostController from "./controllers/post.controller";
import * as RoleController from "./controllers/role.controller";
import * as ScriptureController from "./controllers/scripture.controller";
import * as TrackController from "./controllers/track.controller";
import { Request, Response } from "express";

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
app.get("/", (res: Response) => {
  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

// Start the server
app.listen(port);
console.log("There will be dragons: http://localhost:" + port);

// connect to database
mongoose.connect(config.database);

// bundle our routes
const apiRoutes = express.Router();

app.use("/api", apiRoutes);
apiRoutes.get("/activities", PassportAuthController.isAuthenticated, ActivityController.getActivities);
apiRoutes.get("/activities/:id", PassportAuthController.isAuthenticated, ActivityController.getActivity);
apiRoutes.post("/activities", PassportAuthController.isAuthenticated, ActivityController.addActivity);
apiRoutes.delete("/activities/:id", PassportAuthController.isAuthenticated, ActivityController.deleteActivity);
apiRoutes.post("/signup", AuthController.signup);
apiRoutes.post("/authenticate",  AuthController.authenticate);
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
