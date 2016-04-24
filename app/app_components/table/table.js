
angular.module('table', ['services'])

.controller('tableCtrl', ['$scope','shop','$timeout',function ($scope,shop,$timeout){

    $scope.filterModel ={};

    // query var to filter by all the wanted fields
    var query = {};
    query.itemAmount = 0;
    $scope.viewItems = [];
    $scope.orderList = [];

    $scope.callQuery = function(){
        shop.items.query(query, function (data){
        console.log(data);
        $scope.viewItems = data;
        });
    }
    // dale tiempo para que la info pase al servicio
    $timeout(function(){
        $scope.firmaId = shop.getCompanyId(); // esto hay que traerlo desde un servicio que se valide por login
        $scope.filterBy = shop.getCompanyFilters();
        console.log($scope.filterBy);
        query.companyId = $scope.firmaId;
        $scope.callQuery();
    },800);

    

    

    $scope.updateQuery = function(){
        const q = {};
        q.itemAmount = 0;
        q[$scope.filterModel.queryObjKey] = $scope.queryTag;
        console.log(q);
        query = q;
        $scope.callQuery();
    }

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







