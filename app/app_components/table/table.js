
angular.module('table', ['services'])

.controller('tableCtrl', ['$scope','items',function ($scope,items){

    $scope.viewItems = [];

    items.metodo.query({cant:0}, function (data){
        console.log(data);

        $scope.viewItems = data;

    });
    
}])
.controller('allItemsCtrl', ['$scope','items',function ($scope,items){

    $scope.viewItems = [];

    items.metodo.query(function (data){
        console.log(data);

        $scope.viewItems = data;

    });
    
}])

.directive('iTable', function(){

    return {
            restrict: 'E',
            templateUrl: "app_components/table/table.html"     
    };

})







