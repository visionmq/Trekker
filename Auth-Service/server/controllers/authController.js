const User = require('../models/userModel.js')

const authController = {}

authController.signup = (req, res, next) => {
  // const {username, password} = req.body
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
  console.log('this is the body ', req.body)
  User.create({username: req.body.body.username, password: req.body.body.password, email: req.body.body.email, })
  .then((user) => {
    // console.log(user, ' has been added to the database')
    res.locals.newUser = user
    return next();
  })
  .catch((err) => {
    return next({
      log: 'there is an error in authController signin',
      status: 400,
      message: { err: err.message },
    });
  })
};

authController.signin = async (req, res, next) => {
    const user = await User.findOne({username: req.body.body.username, password: req.body.body.password})
    if(!user) return res.status(404).send('User not found')
    // console.log(user, ' has been logged in')
    res.locals.user = user
    next();
}

authController.checkout = async(req, res, next) => {
    console.log('this is req.body', req.body)

    User.updateOne({username: req.body.body.username}, {$push: {bookings: req.body.body.propertyID}})
    .then((bookings) => {
      console.log(`${req.body.body.propertyID} has been added to ${req.body.body.username}'s database`)
      })
      .catch((err) => {
        return next(err);
      })

    const user = await User.findOne({username: req.body.body.username})
    console.log('this is user', user)
    next();
}

module.exports = authController
