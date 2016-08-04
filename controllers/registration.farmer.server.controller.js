/**
 * Created by Administrator on 26.07.2016.
 */
var farmer1=require('../models/farmer.server.model');


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
    mappingLib.create('farmer',req.body,function(obj){
        obj.schema.pre('save',function(){
            console.log("list the data");
        });
        obj.save(function(err) {
            if (err) throw err;
            console.log("created");
        });
    });

    // mappingLib.getObject('farmer',function(obj){
    //     obj.find({},function(err,data) {
    //         if (err) throw err;
    //         console.log(data);
    //
    //     });
    // });

    // mappingLib.readMapperFile(function(obj){
    //     obj.save(function(err) {
    //         if (err) throw err;
    //         console.log("created");
    //         console.log(obj.value);
    //
    //     });
    //
    // });
    // var farmerObj=farmer1({
    //     fname: 'name',
    //     lname:'nanan',
    //     location:'aaaa',
    //     zip: 'ssss',
    //     mob: 'ddddd'
    // });



    // var data=mappingLib.read('farmer',{fname:'yoosuf'},function(data){
    //     console.log(data);
    // });
    // mappingLib.exec('farmer','find({fname:"yoosuf"})');
    // mappingLib.update('farmer',{fname:'yoosuf'},{fname:'haii'});
    // mappingLib.remove('farmer',{fname:'yoosuf'});
    res.send('success');
};


