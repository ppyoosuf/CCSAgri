/**
 * Created by Administrator on 27.07.2016.
 */
var fs = require("fs");
var parseString = require('xml2js').parseString;
var jsonContent;
// var models=[];
// models.length=0;
var modelObj=[];

var getModel=function(modelName,cb){                                        //load the model files

    if(modelName===null || modelName===undefined || modelName===''){
        appError(new Error("Not a valid value for model/not existing"));
    }
        var modelObj = require(modelName);
        cb(modelObj);

};

var checkDupicate=function(models){
    var sortedModels = models.slice().sort();
    var results = [];
    results.length=0;
    for (var i = 0; i < models.length - 1; i++) {
        if (sortedModels[i + 1] == sortedModels[i]) {
            results.push(sortedModels[i]);
        }
    }

    if(results.length > 0)
        appError(new Error("find Duplicate model Name"));
};
var readMapperXMLFile=function(cb){                                          // Get content from  XML file
    var models=[];
    models.length=0;
    fs.stat(__dirname+'/mapper.xml', function(err, stat) {
        if(err == null) {
            var contents = fs.readFileSync(__dirname+"/mapper.xml");
            parseString(contents, function (err, result) {
                    jsonContent=result;
                    convertToValidJson(result,function(){
                        // models=Object.keys(jsonContent);
                        for(var key in jsonContent){
                            models.push(key)
                        }
                        checkDupicate(models);
                    cb();
                });

            });
        } else if(err.code == 'ENOENT') {
            appError(new Error("No /config/mapper.xml files"));
        } else {                                                             //some error occured
            appError(new Error(err.message));
            return;

        }
    });
};

var convertToValidJson=function(data,cb){                                      //converting the data to validJON Data
    var j={};
    for(var i=0;i<data.models.model.length;i++) {
        var tModel={};
        var tFields=[];
        var modelObj=data.models.model[i];

        if(modelObj.modelPath[0]===null || modelObj.modelPath[0]===undefined ||modelObj.modelPath[0]==='')
            appError(new Error("invalid XML fields"));
        if(modelObj.modelName[0]===null || modelObj.modelName[0]===undefined ||modelObj.modelName[0]==='')
            appError(new Error("invalid XML fields"));
        if(modelObj.formModel[0]===null || modelObj.formModel[0]===undefined ||modelObj.formModel[0]==='')
            appError(new Error("invalid XML fields"));
        if(modelObj.schema[0]===null || modelObj.schema[0]===undefined ||modelObj.schema[0]==='')
            appError(new Error("invalid XML fields"));


        tModel.model=modelObj.modelPath[0];
        tModel.modelName=modelObj.modelName[0];
        tModel.formModel=modelObj.formModel[0];
        tModel.schema=modelObj.schema[0];

        var fields=modelObj.fields;
            for(var f=0;f<fields.length;f++){

                if(fields[f].formField[0]===null || fields[f].formField[0]===undefined ||fields[f].formField[0]==='')
                    throw new Error("invalid XML fields");
                if(fields[f].modelField[0]===null || fields[f].modelField[0]===undefined ||fields[f].modelField[0]==='')
                    throw new Error("invalid XML fields");

                tFields.push({formField:fields[f].formField[0],modelField:fields[f].modelField[0]});

            }

        tModel.fields=tFields;
        j[modelObj.modelName[0]]=tModel;
    }
    jsonContent=j;
    console.log(jsonContent);
    cb();

};

var readMapperFile=function(verifyModel){                                   // Get content from file

    var models=[];
    models.length=0;
    fs.stat(__dirname+'/mapper.json', function(err, stat) {
        if(err == null) {

            var contents = fs.readFileSync(__dirname+"/mapper.json");
            jsonContent = JSON.parse(contents);
            for(var key in jsonContent){
                models.push(key);
            }

            checkDupicate(models);
            verifyModel();
        } else if(err) {
            readMapperXMLFile(function(){
                verifyModel();
            });
        } else if(err.code == 'ENOENT') {
            appError(new Error("No /config/mapper.json files"));
        } else {                                                            //some error occured
            appError(new Error(err.message));
            return;

        }

    });
};

var createObject=function(model){

    if(model===null || model==='' || model===undefined)
        throw new Error("invaid Model");

};

var create=function(model,formObj,cb){                                      //create function

    readMapperFile(function(){
         getModel(jsonContent[model].model,function(modelObj){
             var newObj;
             var fieldsValue={};
             var objSchema=modelObj.schema;

             for(var key in formObj){
                 for(var i=0;i<jsonContent[model].fields.length;i++){

                     if(jsonContent[model].fields[i]['modelField']===null || jsonContent[model].fields[i]['modelField']===undefined ||jsonContent[model].fields[i]['modelField']==='')
                         appError(new Error("invalid model fields"));
                     if(jsonContent[model].fields[i]['formField']===null || jsonContent[model].fields[i]['formField']===undefined ||jsonContent[model].fields[i]['formField']==='')
                         appError(new Error("invalid model fields"));

                     var modelField=jsonContent[model].fields[i]['modelField'];
                     var formField=jsonContent[model].fields[i]['formField'];
                     fieldsValue[modelField]=formObj[key][formField];
                 }

             }
             newObj=modelObj(fieldsValue);
             cb(newObj);

         });
    });
};

var getObject=function(model,cb){
    readMapperFile(function(){
        getModel(jsonContent[model].model,function(modelObj){
            var objSchema=modelObj.schema;
            cb(modelObj);
        });
        });

};

var appError = function (err) {
    var name = "Application Error", msg;
    if ( err instanceof Error ) {
        msg = err.message;
        name = "Application Error [" + err.name + "]";
    } else {
        msg = err;
    }

    this.message = msg;
    this.name = name;
    console.log('An error occured', this.message);

};

exports.create=create;
exports.getObject=getObject;