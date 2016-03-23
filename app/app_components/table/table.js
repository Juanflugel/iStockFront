
angular.module('table', ['services'])

.controller('tableCtrl', ['$scope','shop',function ($scope,shop){

    $scope.viewItems = [];
    $scope.orderList = [];

    shop.items.query({itemAmount:0}, function (data){
        console.log(data);
        $scope.viewItems = data;
    });

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "OrderList.xls");
    };

    $scope.exportsome = function () {
        var blob = new Blob([document.getElementById('justsome').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "OrderList.xls");
    };







    
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







