
angular.module('table', ['services'])

.controller('tableCtrl', ['$scope','$loStorage',function ($scope,$loStorage){
    // initialize scope table
    $scope.table = {};
    // initialize local Storage DB and add it to the scope
    var stock = new localStorageDB('stock', localStorage);
    $scope.stock = stock;
    // verify if the DB has already Data
    if ($scope.stock.tableExists('items')){
        $scope.table.data = $scope.stock.queryAll('items');
        $scope.table.header = $scope.table.data[0];
        // console.log($scope.table.data);
    } 
    else{
        $scope.table.data = [];
        $scope.table.header = [];
    } 

    $scope.show = false;
    $scope.obj = {}; // initialize an Object to be created, updated or delected
    // pass the Id from the current selected Object
    $scope.passIdObj = function(i){
        console.log(i);
        $scope.objs = $scope.stock.queryAll('items',{query:{ID:i}});
        $scope.obj = $scope.objs[0];           
        console.log($scope.objs,$scope.obj);
        $scope.show = true;
    };

    // function To create a new Object        
    $scope.newItem = function(){        
        $scope.obj ={};
    }
    // Update an Object
    $scope.updateObj = function(obj){
        console.log(obj.ID);
        $scope.stock.update('items',{ID: obj.ID}, function(row) {
            row.itemProvider = obj.itemProvider;
            row.itemName = obj.itemName;
            row.itemMarke = obj.itemMarke;
            // the update callback function returns to the modified record
            return row;
        });
        $scope.stock.commit();
        $scope.table.data = $scope.stock.queryAll('items');
        $scope.obj ={};
    };
}])

.directive('iTable', function(){

 function link(scope, element, attrs){

        scope.ObjtoArray = function(array){
             return _.map(array, function(obj){
                                                return _.toArray(obj);
                                        });
        };
        scope.TablaHeader = function(obj){
                        //console.log(_.keys(obj));
                        return _.keys(obj);
        };

        scope.predicate = '0';
        scope.reverse = false;

        scope.tableOrder = function(val){

                 if (scope.predicate == val.toString()) {
                        scope.reverse = !scope.reverse;
                 }
                 else{
                        scope.reverse = false;
                        scope.predicate = val.toString();
                 }
        };

        scope.table.data = scope.ObjtoArray(scope.table.data);
        scope.table.header = scope.TablaHeader(scope.table.header);
            // scope.limite = scope.tabla.datos.length;
            console.log('desde la directiva:',scope.table.data);
    }; 

    return {
            restrict: 'E',
            templateUrl: "app_components/table/table.html",
            link: link      
    };

})


.directive('iInput',function ($loStorage){

        function link (scope,element,attrs){

                var inputFile = angular.element('#i-input');

                inputFile.bind("change", function(e){
                    $loStorage.removeObject('db_stock');
                    $loStorage.removeObject('table');
                    var stock = new localStorageDB('stock', localStorage);                  
                    scope.file = (e.srcElement || e.target).files[0];
                    Papa.parse(scope.file,{
                            header:true,
                            complete:function(result){
                                    scope.stock = stock;
                                    // console.log(result.data);                                    
                                    scope.prueba = result.data;
                                    // $loStorage.setObject('table',scope.prueba);                                                                 
                                    // var d = $loStorage.getObject('table');
                                    // console.log('antes:',d);
                                    stock.createTableWithData('items', scope.prueba);
                                    scope.table.data = scope.stock.queryAll('items');
                                    scope.table.header = _.keys(scope.table.data[0]);
                                    scope.table.data = scope.ObjtoArray(scope.table.data);
                                    scope.stock.commit();

                                    scope.$apply();
                                    
                                                                      
                                    }
                        });
                });

                scope.click = function(){
                        console.log('click desde directiva');
                        inputFile.trigger('click');
                }
        };

        return{
                restrict:'E',
                templateUrl:'app_components/table/input.html',
                link:link
        };
})




