angular.module('companyModule',[])

.controller('companyCtrl', ['$scope','shop','$timeout','$state',function ($scope,shop,$timeout,$state){

    $timeout(function(){
        $scope.firmaId = shop.getCompanyId();
        $scope.employees = shop.getCompanyEmployees();
    },50);
    
    $scope.addUser = function(){
        $scope.user = {};
        $scope.modifyUser = false;
        $scope.createUser = true;
    }

    $scope.saveUser = function (obj){
        var query = {};
        query.companyId = $scope.firmaId;
        // console.log(obj._id);
        shop.companyInfoUpdate.update(query,obj,function (data){
            $scope.user = {};
            $scope.createUser = false;
            $scope.employees.push(obj);
        });
    }

    $scope.editUser = function(obj){
        $scope.user = obj ;
        $scope.modifyUser = true; // ng-show
    }

    $scope.updateUser = function(obj){
        var query = {};
        query.companyId = $scope.firmaId;
        query['companyUsers._id'] = obj._id;
    
        console.log(query);
        shop.companyInfoUpdate.update(query,obj,function (data){
            console.log(data);
            $scope.modifyUser = false; // ng-show
        });
    }

    $scope.deleteUser = function(obj,index){
        const r = confirm('Are you sure to delete the User: '+ obj.userName);
        if (r == true){
            var query = {};
            query.companyId = $scope.firmaId;
            query.userId = obj._id;
            shop.companyInfoUpdate.update(query,{},function (data){
                $scope.employees.splice(index,1);
            });
        }
        else{
            return;
        }

    }
    
}])

.controller('providersCtrl', ['$scope','shop','$timeout',function ($scope,shop,$timeout){
    $scope.modifyProvider = false;

    $timeout(function(){
        $scope.firmaId = shop.getCompanyId();
        $scope.providers = shop.getCompanyProviders();
    },50);    


    $scope.addProvider = function(){
        $scope.obj = {};
        $scope.createProvider = true;
    }

    $scope.saveProvider = function(obj){
        console.log(obj);
        const query = {};
        query.companyId = $scope.firmaId;

        shop.companyInfoUpdate.update(query,obj,function (data){
            console.log(data);
            $scope.obj={};
            $scope.createProvider = false;
            $scope.providers.push(obj);
        });
    }

     $scope.editProvider = function(obj){
        $scope.obj = obj ;
        $scope.modifyProvider = true; // ng-show
        console.log($scope.obj);
    }


    $scope.updateProvider = function(obj){
        var query = {};
        query.companyId = $scope.firmaId;
        query['companyProviders._id'] = obj._id;    
        console.log(query);
        shop.companyInfoUpdate.update(query,obj,function (data){
            console.log(data);
            $scope.modifyProvider = false; // ng-show
        });
    }

    $scope.deleteProvider = function(obj,index){
        const r = confirm('Are you sure to delete the Provider: '+ obj.providerName);
        if (r == true){
            var query = {};
            query.companyId = $scope.firmaId;
            query.providerId = obj._id;
            shop.companyInfoUpdate.update(query,{},function (data){
                $scope.providers.splice(index,1);
            });
        }
        else{
            return;
        }

    }
    
}])