"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require("passport-jwt");
const ExtractJwt = require("passport-jwt");
const passport = require("passport");
// load up the user model
let User = require("../models/user");
let config = require("../../config/database"); // get db config file
let opts = {
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
passport.use(new JwtStrategy.Strategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
}));
exports.isAuthenticated = passport.authenticate("jwt", { session: false });
//# sourceMappingURL=passportAuth.controller.js.map