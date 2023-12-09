const User = require('../models/userModel.js');

const authController = {};

authController.signup = (req, res, next) => {
  const username = req.body.body.userName
  const password = req.body.body.password
  const usernameReg = new RegExp("^(?=.*[!@#$%^&*()_+=[]{};':\",./<>?~`])$");
  const passwordReg = new RegExp("^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[?!.'$])[A-Za-z0-9?!.$']{8,}$");
  if (usernameReg.test(username)) {
      return res.status(200).json("Username had invalid chars")
  }
  if (passwordReg.test(password)) {
    return res.status(200).json("Password had invalid chars")
  }
  User.create({
    username: req.body.body.userName,
    password: req.body.body.password,
    email: req.body.body.email,
  })
    .then((user) => {
      console.log(user.username, ' has been added to the database');
      console.log('this is the user object: ', user)
      req.body.body.properties = user.bookings;
      req.body.body.password = ""
      req.body.status = "auth-signup-success-app"
      res.locals.body = req.body
      return next();
    })
    .catch((err) => {
      return res.status(200).json("Username was taken")
    });
};

authController.login = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.body.userName,
    password: req.body.body.password,
  });

  if (!user) return res.status(200).json("That's not it chief");
  console.log(user.username, ' has been logged in');
  console.log('this is the user object: ', user)
  req.body.body.password = ""
  req.body.body.properties = user.bookings
  req.body.status = "auth-login-sucess-app"
  res.locals.body = req.body;
  next();
};

authController.checkout = async (req, res, next) => {
  User.updateOne(
    { username: req.body.body.userName },
    { $push: { bookings: req.body.body.propertyID } }
  )
    .then((bookings) => {
      console.log(
        `${req.body.body.propertyID} has been added to ${req.body.body.userName}'s database`
      );
    })
    .catch((err) => {
      return next(err);
    });
  req.body.status = 'auth-booking-updated-app';
  res.locals.body = req.body;
  next();
};

module.exports = authController;
