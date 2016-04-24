angular.module('companyModule',[])

.controller('companyCtrl', ['$scope','shop',function ($scope,shop){

    $scope.firma = {};
    var firmaId = 'RMB01';

    shop.company.query({companyId:firmaId}, function (data){
        console.log(data);
        $scope.firma = data[0];
        $scope.employees = $scope.firma.companyUsers;
    });

    $scope.addUser = function(){
        $scope.user = {};
        $scope.modifyUser = false;
        $scope.createUser = true;
    }

    $scope.saveUser = function (obj){
        var query = {};
        query.companyId = firmaId;
        // console.log(obj._id);
        shop.companyInfoUpdate.update(query,obj,function (data){
            console.log(data);
            $scope.user = {};
            $scope.createUser = false;
            $scope.employees.push(obj);
        });
    }

    $scope.editUser = function(obj){
        $scope.user = obj ;
        $scope.modifyUser = true; // ng-show
        console.log($scope.user);
    }

    $scope.updateUser = function(obj){
        var query = {};
        query.companyId = firmaId;
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
            query.companyId = firmaId;
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

.controller('providersCtrl', ['$scope','shop',function ($scope,shop){

    var firmaId = 'RMB01';
    $scope.modifyProvider = false;
    shop.company.query({companyId:firmaId}, function (data){
            console.log(data);
            $scope.firma = data[0];
            $scope.providers = $scope.firma.companyProviders;
        });

    $scope.addProvider = function(){
        $scope.obj = {};
        $scope.createProvider = true;
    }

    $scope.saveProvider = function(obj){
        console.log(obj);
        const query = {};
        query.companyId = firmaId;

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
        query.companyId = firmaId;
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
            query.companyId = firmaId;
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