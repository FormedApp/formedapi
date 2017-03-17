const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;

//= =======================================
// User Routes
//= =======================================
// exports.viewProfile = (req, res, next) => {
//   const userId = req.params.userId;
//   const groupId = req.params.groupId;

//   if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
//   User.findById(userId, (err, user) => {
//     if (err) {
//       res.status(400).json({ error: 'No user could be found for this ID.' });
//       return next(err);
//     }

//     const userToReturn = setUserInfo(user);

//     return res.status(200).json({ user: userToReturn });
//   });
//   return null;
// };

exports.postUpdateGroupRoles = (req, res, next) => {
  const userId = req.params.userId;
  const groupId = req.params.groupId;

  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'No user could be found for this ID.' });
      return next(err);
    }

    // getting user
    // getting group in this user
    // update roles in this group

    return res.status(200).json({ msg: "Update user's group roles" });
  });
  return null;
};
