/**
 * Created by Administrator on 26.07.2016.
 */
var farmer=require('../models/farmer.server.model');


exports.registerFarmer=function(){
    var newFarmer=farmer({
        farmName: 'farmer1',
        farmAge: '20',
        farmAdd1:'address1',
        farmAdd2: 'address2',
        farmState:'2',
        farmDist: '3',
        farmZip: '676306',
        regDate: '4-05-216',
        farmStats: '1'
    });

    newFarmer.save(function(err) {
        if (err) throw err;

        console.log('Farmer created!');
    });
};


