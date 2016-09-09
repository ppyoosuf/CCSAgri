/**
 * Created by Administrator on 26.07.2016.
 */
var request = require('request');                           //Supporting Libraries
var cheerio = require('cheerio');

var errorCtrl=require('./error.server.controller');


exports.kccLocations=function(req,res){
    var url = 'http://mkisan.gov.in/kccfeatures.aspx';
    var result=[];
    request(url, function(error, response, html){
        // console.log(error);
        if(!error){
            var $ = cheerio.load(html);

            var tblData= $('table');
            var rows=tblData.find("tr");

            for(var i=2;i<rows.length;i++){
                var json = {};
                var cols=$(rows[i]).find("td");

                json.location=$(cols[1]).text();
                json.states=$(cols[2]).text();
                json.language=$(cols[3]).text();

                result.push(json);
            }
            res.send(JSON.stringify(result));
        }
    });
};


exports.aboutKcc=function(req,res){
    var url = 'http://mkisan.gov.in/aboutkcc.aspx';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var data= $('.middlelargemiddle');
            var about=$(data).find("p").text();
            res.send(about);
        }
    });
};

exports.liveMessages=function(req,res){
    var url = 'http://mkisan.gov.in/advs/live.aspx';
    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var data= $('ul');
            var lis=$(data).find("li");
            for(var i=0;i<lis.length;i++){

                var msgData={};
                var msg=$(lis[i]).text();
                msgData.message=msg;
                result.push(msgData);
            }

            res.send(result);
        }
    });
};


