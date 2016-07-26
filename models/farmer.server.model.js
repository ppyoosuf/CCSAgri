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
    farmName: { type: String, required: true },
    farmAge: { type: String, required: true },
    farmAdd1: { type: String, required: true },
    farmAdd2: { type: String, required: false },
    farmState: { type: String, required: true },
    farmDist: { type: String, required: true },
    farmZip: { type: String, required: true },
    regDate: { type: Date, required: true },
    farmStats: { type: String, required: true }
});

//create the farmer model
var farmer = mongoose.model('farmer', farmerSchema);

// make this available to our users in our Node applications
module.exports = farmer;