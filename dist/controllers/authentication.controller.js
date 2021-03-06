"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const group_1 = require("../models/group");
const database_1 = require("../config/database");
const jwt = require("jwt-simple");
const cuid = require("cuid");
// const mailgun from '../config/mailgun');
// const mailchimp = require('../config/mailchimp');
// const setUserInfo = require('../helpers').setUserInfo;
// const getRole = require('../helpers').getRole;
// const config = require('../config/main');
/*// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800, // in seconds
  });
}

//= =======================================
// Login Route
//= =======================================
export const login = (req: Request, res: Response) => {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo,
  });
};


//= =======================================
// Registration Route
//= =======================================
export const register = (req: Request res, next) => {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

      // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

      // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
      profile: { firstName, lastName },
    });

    user.save(() => {
      if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
      return null;
    });
    return null;
  });
  return null;
};

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
export const roleAuthorization = (requiredRole) => {
  return (req: Request res, next) => {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};

//= =======================================
// Forgot Password Route
//= =======================================

export const forgotPassword = (req: Request res, next) => {
  const email = req.body.email;

  User.findOne({ email }, (err, existingUser) => {
    // If user is not found, return error
    if (err || existingUser == null) {
      res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
      return next(err);
    }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
    crypto.randomBytes(48, (buffer) => {
      const resetToken = buffer.toString('hex');
      if (err) { return next(err); }

      const user = existingUser;
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(() => {
          // If error in saving token, return it
        if (err) { return next(err); }

        const message = {
          subject: 'Reset Password',
          text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

          // Otherwise, send user email via Mailgun
        mailgun.sendEmail(existingUser.email, message);

        return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
      });
      return null;
    });
    return null;
  });
};

//= =======================================
// Reset Password Route
//= =======================================

export const verifyToken = (req: Request res, next) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser) => {
    // If query returned no results, token expired or was invalid. Return error.
    if (!resetUser) {
      res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
    }

      // Otherwise, save new password and clear resetToken from database
    const user = resetUser;
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save(() => {
      if (err) { return next(err); }

        // If password change saved successfully, alert user via email
      const message = {
        subject: 'Password Changed',
        text: 'You are receiving this email because you changed your password. \n\n' +
          'If you did not request this change, please contact us immediately.',
      };

        // Otherwise, send user email confirmation of password change via Mailgun
      mailgun.sendEmail(user.email, message);

      return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
    });
  });
};
*/
exports.signup = (req, res) => {
    if (!req.body.username ||
        !req.body.password ||
        !req.body.user.email ||
        !req.body.user.firstName ||
        !req.body.user.lastName) {
        res.json({ success: false, msg: "Please fill out the complete form." });
    }
    else {
        const newUser = new user_1.default({
            id: cuid(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.user.email,
            first_name: req.body.user.firstName,
            last_name: req.body.user.lastName
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: "Username already exists." });
            }
            res.json({ success: true, msg: "Successful created new user." });
        });
    }
};
exports.authenticate = (req, res) => {
    user_1.default.findOne({
        $or: [
            {
                username: req.body.username
            },
            {
                email: req.body.username
            }
        ]
    }, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            res.send({
                success: false,
                msg: "Authentication failed. User not found."
            });
        }
        else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    const token = jwt.encode(user, database_1.config.secret);
                    // return the information including token as JSON
                    group_1.default.find({ id: { $in: user.groups } }, function (err, groups) {
                        if (err) {
                            res.send({
                                success: false,
                                msg: "Authentication failed. Group not found."
                            });
                        }
                        else {
                            const result = {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                groups: groups,
                                roles: user.roles,
                                created_at: user.created_at,
                                updated_at: user.updated_at
                            };
                            res.json({ user: result, token: "JWT " + token });
                        }
                    });
                }
                else {
                    res.send({
                        success: false,
                        msg: "Authentication failed. Wrong password."
                    });
                }
            });
        }
    });
};
//# sourceMappingURL=authentication.controller.js.map