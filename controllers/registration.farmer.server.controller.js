/**
 * Created by Administrator on 26.07.2016.
 */
var farmer1=require('../models/farmer.server.model');
var errorCtrl=require('./error.server.controller');

exports.registerFarmer=function(){
    var newFarmer=farmer1({
        fname: 'farmer1',
        lname: '20',
        location:'address1',
        zip: 'address2',
        mob:'2'

    });
    console.log(newFarmer);
//
//     newFarmer.save(function(err) {
//         if (err) throw err;
//
//         console.log('Farmer created!');
//     });
};

exports.home=function(req,res){
    var path=require('path');
    res.sendFile(path.resolve(__dirname+'/../public/app/registration/registration.farmer.html'));
};


exports.register=function(req,res){
    var mappingLib=require('../config/mappingLibrary');
    // return new errorCtrl.appError(new Error("data failed"));
    // mappingLib.create('farmer',req.body,function(obj){
    //     // obj.schema.pre('save',function(){
    //     //     console.log("list the data");
    //     // });
    //     obj.save(function(err) {
    //         if (err) throw err;
    //         console.log("created");
    //     });
    // });

    mappingLib.getObject('farmer',function(obj){
        obj.find({},function(err,data) {
            if (err) throw err;
            console.log(data);
        });
    });


    // mappingLib.getObject('farmer',function(obj){
    //     obj.remove({_id: '57b3f91d1f26fdd0125033db'},function(err,data) {
    //         if (err) throw err;
    //         console.log(data);
    //
    //     });
    // });


// mappingLib.readMapperXMLFile();

    // var data=mappingLib.read('farmer',{fname:'yoosuf'},function(data){
    //     console.log(data);
    // });
    // mappingLib.exec('farmer','find({fname:"yoosuf"})');
    // mappingLib.update('farmer',{fname:'yoosuf'},{fname:'haii'});
    // mappingLib.remove('farmer',{fname:'yoosuf'});
    res.send('success');
};


