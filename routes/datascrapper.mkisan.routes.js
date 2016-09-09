/**
 * Created by Administrator on 26.07.2016.
 */

var dataScrapperCtrl=require('../controllers/datascraper.mkisan.server.controller');

module.exports=function(app){
    app.get("/api/mkisan/kcclocations",dataScrapperCtrl.kccLocations);
    app.get("/api/mkisan/aboutKcc",dataScrapperCtrl.aboutKcc);
    app.get("/api/mkisan/liveMessages",dataScrapperCtrl.liveMessages);
};