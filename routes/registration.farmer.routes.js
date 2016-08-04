/**
 * Created by Administrator on 26.07.2016.
 */

//includes the required libraries
var registerFrmCtrl=require('../controllers/registration.farmer.server.controller');

module.exports=function(app){
    app.get("/api/registerFarmer",registerFrmCtrl.registerFarmer);
    app.get("/",registerFrmCtrl.home);
    app.post("/farmer/register",registerFrmCtrl.register);
};