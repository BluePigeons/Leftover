var db = require('../db');
var Meal = db.model('Meal', {
    posted_By:  { type : String, required : true },
    image_Link: { type : String, required : true },
    expiration: { type : Date,   required : true, default : Date.now }    
})
module.exports = Meal
