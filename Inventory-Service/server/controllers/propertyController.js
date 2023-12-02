const Property = require('../models/propertyModel.js');

const propertyController = {}

propertyController.addProperty = ((req, res, next) => {

    Property.create(req.body)
    .then((data) => {
      res.locals.newProperty = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'there is an error in propertyController addProperty',
        status: 400,
        message: { err: err.message },
      });
    });

})

module.exports = propertyController;