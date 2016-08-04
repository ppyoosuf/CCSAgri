/**
 * Created by Administrator on 27.07.2016.
 */
var fs = require("fs");
var jsonContent;
var models=[];
var obj;

var readMapperFile=function(verifyModel){
// Get content from file

    fs.stat('./config/mapper.json', function(err, stat) {
        if(err == null) {

            var contents = fs.readFileSync("./config/mapper.json");
            jsonContent = JSON.parse(contents);


            for(var key in jsonContent){
                var fieldsValue={};
                var modelObj=require(jsonContent[key].model);
                var objSchema=modelObj.schema;
                for(var i=0;i<jsonContent[key].fields.length;i++){
                    var modelField=jsonContent[key].fields[i]['modelField'];
                    fieldsValue[modelField]='';
                }

                obj=modelObj();

                // modelObj.schema.pre('validate', function(next){
                //     for(var i=0;i<jsonContent[key].fields.length;i++){
                //         var modelField=jsonContent[key].fields[i]['modelField'];
                //         fieldsValue[modelField]='ttttt';
                //         console.log(fieldsValue);
                //     }
                //     console.log(fieldsValue);
                //     obj.value=modelObj(fieldsValue);
                //     next();
                //
                // });
                
                // modelObj(fieldsValue).save(function(err) {
                //     if (err) throw err;
                //     console.log("created");
                // });



                // modelObj.schema.pre('save',function(next){
                //     console.log('aveeee');
                //     next();
                // });
                models.push(key);

            }

        } else if(err.code == 'ENOENT') {
            throw new Error("No /config/mapper.json files")
        } else {                                                            //some error occured
            console.log('Some other error: ', err.message);
            return;

        }
        verifyModel();
    });
};



var createObject=function(model){

    if(model===null || model==='' || model===undefined)
        throw new Error("invaid Model");

};


var verifyModel=function(input){

    for(var inputKey in input){
        for(var key in jsonContent){

        }
    }
};

var create=function(model,formObj,cb){
    // console.log(jsonContent[model].fields);

    //creating object
    readMapperFile(function(){
        verifyModel();
         var modelObj=require(jsonContent[model].model);
         var newObj;
         var fieldsValue={};
         for(var key in formObj){
             for(var i=0;i<jsonContent[model].fields.length;i++){
                 var modelField=jsonContent[model].fields[i]['modelField'];
                 var formField=jsonContent[model].fields[i]['formField'];
                 fieldsValue[modelField]=formObj[key][formField];
             }

         }


         console.log(fieldsValue);
         newObj=modelObj(fieldsValue);
        
         cb(newObj);
         // newObj.save(function(err) {
         //     if (err) throw err;
         //     console.log("created");
         // });
    });



};

var getObject=function(model,cb){

    readMapperFile(function(){
        verifyModel();
        var modelObj=require(jsonContent[model].model);
        var objSchema=modelObj.schema;
        modelObj.schema.pre('find',function(){
            console.log("list the data");
        });
        
        cb(modelObj);

    });
};

// var read=function(model,condition,cb){
//     var selCondition;
//     (condition===undefined || condition==='' || condition===null) ? selCondition='':selCondition=condition;
//     readMapperFile(function() {
//         verifyModel();
//         var modelObj=require(jsonContent[model].model);
//         modelObj.find(selCondition, function (err, data) {
//             if (err) throw err;
//             cb(data);
//         });
//     });
// };
//
// var update=function(model,condition,updation){
//
//     var selCondition;
//     (condition===undefined || condition==='' || condition===null) ? selCondition='':selCondition=condition;
//
//
//     readMapperFile(function() {
//         verifyModel();
//         var modelObj = require(jsonContent[model].model);
//         modelObj.findOneAndUpdate(selCondition, updation, function (err, user) {
//             if (err) throw err;
//         });
//     });
// };
//
// var exec=function(model,execString){
//
//     // var selCondition;
//     // (condition===undefined || condition==='' || condition===null) ? selCondition='':selCondition=condition;
//
//
//     readMapperFile(function() {
//         verifyModel();
//         var modelObj = require(jsonContent[model].model);
//         var q=model+"."+execString;
//         console.log(q);
//         q.exec(function(err, posts) {
//             console.log(posts);
//         });
//
//     });
// };
//
//
// var remove=function(model,condition){
//     var selCondition;
//     (condition === undefined || condition === '' || condition === null) ? selCondition = '' : selCondition = condition;
//     readMapperFile(function() {
//         verifyModel();
//         var modelObj = require(jsonContent[model].model);
//         modelObj.find(selCondition, function (err, user) {
//             if (err) throw err;
//             modelObj.remove(function (err) {
//                 if (err) throw err;
//             });
//         });
//     });
// };


exports.create=create;
// exports.read=read;
// exports.update=update;
// exports.remove=remove;
// exports.exec=exec;
exports.readMapperFile=readMapperFile;
exports.getObject=getObject;