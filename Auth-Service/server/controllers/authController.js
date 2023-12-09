const User = require('../models/userModel.js');

const authController = {};

authController.signup = (req, res, next) => {
  // const username = req.body.body.userName
  // const password = req.body.body.password
  // const usernameReg = new RegExp("^(?=.*[!@#$%^&*()_+=[]{};':\",./<>?~`])$");
  // const passwordReg = new RegExp("^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[?!.'$])[A-Za-z0-9?!.$']{8,}$");
  // //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d?!.$']{5,}$"
  // if (usernameReg.test(username)) {
  //     const error = {
  //         log: 'Username cannot contain any special characters.',
  //         status: 400,
  //         message: {err: 'Username did not pass the requirements.'},
  //     };
  //     return next(error)
  // }
  // if (!passwordReg.test(password)) {
  //     const error = {
  //         log: 'Password either contains incorrect special characters, is not the correct length, or does not have at least one letter and one number present. Can only include the following special characters: ?, !, ., $, \'.',
  //         status: 400,
  //         message: {err: 'Password did not pass the requirements.'},
  //     };
  //     return next(error);
  // }
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
    // .catch((err) => {
    //   return next({
    //     log: 'there is an error in authController signin',
    //     status: 400,
    //     message: { err: err.message },
    //   });
    // });
};

authController.login = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.body.userName,
    password: req.body.body.password,
  });

  if (!user) return res.status(200).send('failure');
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
