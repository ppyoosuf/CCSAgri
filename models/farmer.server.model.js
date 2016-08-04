/**
 * Created by Administrator on 26.07.2016.
 */

//includes the required libraries
var mongoose = require('mongoose');
var mngoUrl=require('../config/db');
var Schema = mongoose.Schema;

//connect with mongodb
mongoose.connect(mngoUrl.url);

// create a schema
var farmerSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    location: { type: String, required: true },
    zip: { type: String, required: true },
    mob: { type: String, required: true }
});

//create the farmer model
var farmer = mongoose.model('farmer', farmerSchema);

// make this available to our users in our Node applications
module.exports = farmer;

