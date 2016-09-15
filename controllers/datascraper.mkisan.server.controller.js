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

exports.kccStates=function(req,res){
    var url = 'http://mkisan.gov.in/kccstatesinvolvement.aspx';
    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var tblData= $('table');
            var rows=tblData.find("tr");

            for(var i=2;i<rows.length;i++){
                var json = {};
                var cols=$(rows[i]).find("td");

                json.location=$(cols[1]).text();
                json.state=$(cols[2]).text();
                json.dNumber=$(cols[3]).text();

                json.contName=$(cols[4]).text();
                json.supervisor=$(cols[5]).text();
                json.mobNo=$(cols[6]).text();

                json.email=$(cols[7]).text();
                json.skypeUser=$(cols[8]).text();


                result.push(json);
            }
            res.send(JSON.stringify(result));
        }
    });
};


exports.salesProducts=function(req,res){
    var url = 'http://mkisan.gov.in/BREG/BuyerProduct.aspx';
    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var tblData= $('#ctl00_ContentPlaceHolderInner_Table1');
            var commodities=$(tblData).find("table");


            for(var i=0;i<commodities.length;i++){
                var json = {};
                var tr=$(commodities[i]).find("tr");
                console.log(tr);
                var td=$(tr[0]).find("td");

                var img=$(td).find("img");
                
                var states=$(td).find("#ctl00_ContentPlaceHolderInner_rptSearchResult_ctl0"+i+"_lblState");
                var sector=$(td).find("#ctl00_ContentPlaceHolderInner_rptSearchResult_ctl0"+i+"_lblSector");
                var category=$(td).find("#ctl00_ContentPlaceHolderInner_rptSearchResult_ctl0"+i+"_Label1");
                var name=$(td).find("#ctl00_ContentPlaceHolderInner_rptSearchResult_ctl0"+i+"_Label2");
                var rate=$(td).find("#ctl00_ContentPlaceHolderInner_rptSearchResult_ctl0"+i+"_Label6");



                console.log(img[0].attribs.src);

                json.img='http://mkisan.gov.in/BREG/'+img[0].attribs.src;
                json.states=$(states[0]).text();
                json.sector=$(sector[0]).text();
                json.category=$(category[0]).text();
                json.name=$(name[0]).text();
                json.rate=$(rate[0]).text();


                // json.location=$(cols[1]).text();
                // json.state=$(cols[2]).text();
                // json.dNumber=$(cols[3]).text();
                //
                // json.contName=$(cols[4]).text();
                // json.supervisor=$(cols[5]).text();
                // json.mobNo=$(cols[6]).text();
                //
                // json.email=$(cols[7]).text();
                // json.skypeUser=$(cols[8]).text();
                //

                result.push(json);
            }
            res.send(JSON.stringify(result));
        }
    });
};

exports.getMenuLinks=function(req,res){
    var url = 'http://mkisan.gov.in/';
    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var link= $('a');


            for(var i=2;i<link.length;i++){
                var json = {};

                if($(link[i]).attr("href")!='#' && typeof $(link[i]).attr("href") !== typeof undefined && $(link[i]).attr("href") !== false){

                    var href;
                    if($(link[i]).attr("href").indexOf("www") > 0  || $(link[i]).attr("href").indexOf("http") > 0)
                        href=$(link[i]).attr("href");
                    else
                        href=url+$(link[i]).attr("href");

                    json.href=href;
                    json.title=($(link[i]).attr("title")==='' || $(link[i]).attr("title")=== typeof  undefined)?$(link[i]).text():$(link[i]).attr("title");
                    result.push(json);
                }

            }
            res.send(JSON.stringify(result));
        }
    });
};

exports.getMenuBuyerLinks=function(req,res){
    var url = 'http://mkisan.gov.in/BREG/BReg.aspx';
    var tarUrl = 'http://mkisan.gov.in/';

    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var link= $('a');


            for(var i=0;i<link.length;i++){
                var json = {};

                if($(link[i]).attr("href")!='#' && typeof $(link[i]).attr("href") !== typeof undefined && $(link[i]).attr("href") !== false){
                    var href;
                    if($(link[i]).attr("href").indexOf("www") > 0  || $(link[i]).attr("href").indexOf("http") > 0)
                        href=$(link[i]).attr("href");
                    else
                        href=tarUrl+$(link[i]).attr("href").replace('../','');

                    json.href=href;
                    json.title=($(link[i]).attr("title")==='' || $(link[i]).attr("title")=== typeof  undefined)?$(link[i]).text():$(link[i]).attr("title");
                    result.push(json);
                }

            }
            res.send(JSON.stringify(result));
        }
    });
};

exports.getformLinks=function(req,res){
    var url = 'http://mkisan.gov.in/BREG/BReg.aspx';
    var tarUrl = 'http://mkisan.gov.in/';

    var result=[];
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var forms= $('form');

            for(var i=0;i<forms.length;i++){
                var json = {};

                    json.action=tarUrl+$(forms[i]).attr("action");
                    json.method=$(forms[i]).attr("method");
                    json.id=$(forms[i]).attr("id");

                    result.push(json);
                }
            res.send(JSON.stringify(result));
        }
    });
};




