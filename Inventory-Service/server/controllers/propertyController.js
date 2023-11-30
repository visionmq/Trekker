const { createClient } = require('@supabase/supabase-js');
const Property = require('../models/propertyModel.js');
const supabaseUrl = 'https://afkebokyfqnipcavvsxj.supabase.co'
const supabaseKey = process.env.SUPPABASE_KEY//not Working lol

const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFma2Vib2t5ZnFuaXBjYXZ2c3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExOTA5MjYsImV4cCI6MjAxNjc2NjkyNn0.j78G_z-mzwssumAW5mV5Vv9coJXKEh2yClULJpA5cN4')


const propertyController = {}

propertyController.addProperty = (async (req, res, next) => {

    try{
      const {data, error} = await supabase
        .storage
        .from('properties')
        .upload(req.body.image)

      //get the url from the uploaded image
      const imageUrl = await supabase
        .storage
        .from('properties')
        .getPublicUrl(req.body.image)
      
        //update value of item.image to the string of the url
        req.body.image = imageUrl.data.publicUrl;
    } catch (err) {console.log(err)}

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