
const signUpController = {}

signUpController.createUser = (req, res, next) => {
  const {username, password} = req.body.user;
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
  res.locals.user = {username: username, password: password};
  next();
};