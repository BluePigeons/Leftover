var db = require('../db');
var Meal = db.model('Meal', {
    postedby  :  { type : String, required : true }
    //imagelink : { type : String, required : true },
    //expiration: { type : Date,   required : true, default : Date.now }    
})
module.exports = Meal
