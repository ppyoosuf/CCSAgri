/**
 * Created by Administrator on 27.07.2016.
 */

var app=angular.module('myApp',[])
    .controller('registrationCtrl',function($scope,$http){
        $scope.newFarmer={
            fname:'yoosuf',
            lname:'pp',
            location:'coimbatore',
            pin:'676306',
            mob:'902082157878'
        };

        $scope.register=function () {
            $http.post('/farmer/register',{farmer:$scope.newFarmer})
                .then(function(data){
                    alert("Saved");
                },function(err){
                    alert("Error");
                })
        }
});