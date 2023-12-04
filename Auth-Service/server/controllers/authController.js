const User = require('../models/userModel.js')

const authController = {}

authController.signup = (req, res, next) => {
  const {username, password} = req.body
  const usernameReg = new RegExp("^(?=.*[!@#$%^&*()_+=[]{};':\",./<>?~`])$");
  const passwordReg = new RegExp("^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[?!.'$])[A-Za-z0-9?!.$']{8,}$");
  //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d?!.$']{5,}$"
  if (usernameReg.test(username)) {
      const error = {
          log: 'Username cannot contain any special characters.',
          status: 400,
          message: {err: 'Username did not pass the requirements.'},
      };
      return next(error)
  }
  if (!passwordReg.test(password)) {
      const error = {
          log: 'Password either contains incorrect special characters, is not the correct length, or does not have at least one letter and one number present. Can only include the following special characters: ?, !, ., $, \'.',
          status: 400,
          message: {err: 'Password did not pass the requirements.'},
      };
      return next(error);
  }

  User.create({ username, password})
  .then((user) => {
    console.log(user, ' has been added to the database')
    return next();
  })
  .catch((err) => {
    return next(err);
  })
}

authController.signin = async (req, res, next) => {
    const user = await User.findOne(req.body.username, req.body.password)
    if(!user) return res.status(404).send('User not found')
    else{
    next();
    }
}

authController.checkout = (req, res, next) => {

    User.updateOne(req.body.username, {$push: {bookings: req.body.booking}})
    .then((booking) => {
        console.log(booking, ` has been added to ${req.body.username}'s bookings`)
        return next();
      })
      .catch((err) => {
        return next(err);
      })
    next();
}

module.exports = authController
