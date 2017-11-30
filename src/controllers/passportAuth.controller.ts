import * as JwtStrategy from "passport-jwt";
import * as ExtractJwt from "passport-jwt";
import * as passport from "passport";

// load up the user model
import User from "../models/user";
import { config } from "../config/database"; // get db config file

const opts = {
  jwtFromRequest: ExtractJwt.ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

passport.use(
  new JwtStrategy.Strategy(opts, function(jwt_payload: any, done: any) {
    User.findOne({ id: jwt_payload.id }, function(err: Error, user: any) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(undefined, user);
      } else {
        done(undefined, false);
      }
    });
  })
);

export const isAuthenticated = passport.authenticate("jwt", { session: false });
