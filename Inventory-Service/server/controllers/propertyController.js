const { createClient } = require('@supabase/supabase-js');
 const Property = require('../models/propertyModel.js');
 const supabaseUrl = 'https://afkebokyfqnipcavvsxj.supabase.co'
 const supabaseKey = process.env.SUPPABASE_KEY//not Working lol

 const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFma2Vib2t5ZnFuaXBjYXZ2c3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExOTA5MjYsImV4cCI6MjAxNjc2NjkyNn0.j78G_z-mzwssumAW5mV5Vv9coJXKEh2yClULJpA5cN4')


 const propertyController = {}

 propertyController.addProperty = (async (req, res, next) => {

    //  try{
    //    const {data, error} = await supabase
    //      .storage
    //      .from('properties')
    //      .upload(req.body.image)

    //    //get the url from the uploaded image
    //    const imageUrl = await supabase
    //      .storage
    //      .from('properties')
    //      .getPublicUrl(req.body.image)

    //      //update value of item.image to the string of the url
    //      req.body.image = imageUrl.data.publicUrl;
    //  } catch (err) {console.log(err)}

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


propertyController.checkQuanity = async (req,res,next) => {
  console.log('ENTERED THE PROP CONTROLLER FOR CHECK QUANTITY')
  // console.log(req.body)
  const id = req.body.body.propertyID

  const quantity = req.body.body.quantity

  const query = await Property.findOne({_id:id})
  console.log(query)


  if(query.quantity >= quantity){
    console.log('WE HAVE ENOUGH QUANTITY AVAILABLE')
    req.body.status = 'inv-preCharge-attempt-bill'
    return next()
  } else {
    console.log('WE DONT HAVE ENOUGH QUANTITY')
    req.body.status = 'inv-preCharge-noAvail-app'
    return next()
  }
}

propertyController.updateQuantity = async(req,res,next) => {
  const id = req.body.body.propertyID
  const quantity = req.body.body.quantity

  const query = await Property.findOne({_id:id})

  const update = await Property.findByIdAndUpdate({_id:id},{quantity: query.quantity - quantity},{new: true});
  req.body.status = 'inv-property-updated-app'
  req.body.body.quantity = update.quantity
next()
}

propertyController.onLoad = async(req, res, next) => {

 const properties = await Property.find({})

//  req.body.body.properties = properties
//  req.body.status = 'inv-load-success-app'
 res.locals.msg = properties

 console.log('THIS IS RES.LOCALS: ', res.locals.msg)
 return next()
}

// const update = await Property.findByIdAndUpdate({_id:id},{quantity:query.quantity - quantity});

 module.exports = propertyController; 

