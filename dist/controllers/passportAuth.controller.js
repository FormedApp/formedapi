"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require("passport-jwt");
const ExtractJwt = require("passport-jwt");
const passport = require("passport");
// load up the user model
const user_1 = require("../models/user");
const database_1 = require("../config/database"); // get db config file
const opts = {
    jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: database_1.config.secret
};
passport.use(new JwtStrategy.Strategy(opts, function (jwt_payload, done) {
    user_1.default.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(undefined, user);
        }
        else {
            done(undefined, false);
        }
    });
}));
exports.isAuthenticated = passport.authenticate("jwt", { session: false });
//# sourceMappingURL=passportAuth.controller.js.map