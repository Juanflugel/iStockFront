
angular.module('table', ['services'])

.controller('tableCtrl', ['$scope','shop',function ($scope,shop){
    var firmaId ="RMB01";
    // query var to filter by all the wanted fields
    var query = {};
    query.itemAmount = 0;
    query.companyId = firmaId;
    $scope.viewItems = [];
    $scope.orderList = [];

    $scope.callQuery = function(){
         shop.items.query(query, function (data){
        console.log(data);
        $scope.viewItems = data;
        });
    }

    $scope.callQuery();

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


$scope.filterModel ={};
    $scope.filterBy = [ {tagToShow:'Categorie',queryObjKey:'itemCategorie',array:['BAUTEILE','NORMTEILE','KAUFTEILE','BRENTEILE']},
                        {tagToShow:'Provider', queryObjKey:'itemProvider',array:['SMC','SCHRAUBEN KÖHLER','BREMER','IFM','INA FAG','STANITECH','HASCO','FESTO','GANTER','TORWEGGE','KTR']},
                        {tagToShow:'Type',queryObjKey:'itemType',array:['FERTIGUNSTEILE','SCHRAUBE','ZYLINDER','MUTTER','SCHEIBE']},
                        {tagToShow:'BauGruppe',queryObjKey:'itemAssemblyName',array:['ABFALLAUFWICKLUNG','ABROLLBOCK','HEIZUNG','GRUNDRAHMEN','FOLIENTRANSPORT','FORMSTATION MIT HEBELANTRIEB','STAPELWAGEN AJOVER','OBERJOCHVERSTELLUNG','SERVOVORSTRECKER','FOLIENUMLENKUNG']}
                     ];






    
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







