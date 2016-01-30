/**
*  Module
*
* Description
*/
angular.module('inputTableModule', ['services'])

.controller('inputTableCtrl', ['$scope','items','socketio', function ($scope,items,socketio){

    function request (){
        items.list.query(function (data){
        $scope.data = data;
        init();
        },function (err){
        console.log('error:',err);
        });
    }

    $scope.data = [];

    // todo lo de socket
    socketio.on('newCollection',function (data){
        $scope.back = data;
        console.log($scope.back);
    });
    socketio.on('newItem', function (data){
        $scope.obj = data;
        $scope.show = true;
        console.log(data);
        request();
    });
    // inicializacion del local storage
    var stock = new localStorageDB('stock', localStorage);
    $scope.stock = stock;

    request();
    

    $scope.sendData = function(arr){
        items.list.save(arr,function (data){
            console.log(data);
        });
    };

    function init(){

        if ($scope.data.length >= 1){
            $scope.collection = $scope.data;
            console.log('la primera condicion:', $scope.collection);
        }
        else if ($scope.stock.tableExists('items')){
            $scope.collection = $scope.stock.queryAll('items');
            console.log('la seguda condicion:',$scope.collection);
        }
        else{
            $scope.collection = [];
            console.log('la ultima condicion');
        }
    }

}])

.directive('inputTable', [ function(){

    // Runs during compile
    return {

        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'app_components/inputTable/inputTable.html',
        link: function($scope, iElm, iAttrs, controller) {
            // Table header configuration
            $scope.header =['Item Code','Name','Amount','Units','Provider','Price'];
            // Edit a Row
            $scope.editRow = function(sample){
                console.log(sample);
                $scope.obj = sample;
                $scope.show = true;
            };

            $scope.updateRow = function(obj){
                $scope.stock.update('items',{ID: obj.ID}, function(row) {
                row = obj;
                // the update callback function returns to the modified record
                return row;
                });
                $scope.stock.commit();
                $scope.collection = $scope.stock.queryAll('items');
                $scope.obj = {};
            }

            $scope.newRow = function(obj){
                $scope.stock.insert('items',obj);
                $scope.stock.commit();
                $scope.collection = $scope.stock.queryAll('items');
                $scope.obj = {};
            }

            $scope.deleteRow = function (id){
                $scope.stock.deleteRows('items',{ID:id});
                $scope.stock.commit();
                $scope.collection = $scope.stock.queryAll('items');
            }
        }
    };
}])

.directive('inputTag', [ '$loStorage',function ($loStorage){
    // Runs during compile
    return {
        
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'app_components/table/input.html',
        
        link: function($scope, iElm, iAttrs, controller) {

            var inputFile = angular.element('#i-input');

                inputFile.bind("change", function(e){
                    $loStorage.removeObject('db_stock');
                    $loStorage.removeObject('table');
                    var stock = new localStorageDB('stock', localStorage);                  
                    $scope.file = (e.srcElement || e.target).files[0];
                    Papa.parse($scope.file,{
                            header:true,
                            complete:function(result){
                                    $scope.stock = stock;                                    
                                    $scope.prueba = result.data;
                                    var l = $scope.prueba.length;
                                    $scope.prueba.splice((l-1),1);
                                    $scope.stock.createTableWithData('items', $scope.prueba);
                                    $scope.stock.commit();
                                    $scope.collection = $scope.stock.queryAll('items');
                                    $scope.$apply();           
                            }
                    });
                });

                $scope.click = function(){
                        console.log('click desde directiva');
                        inputFile.trigger('click');
                }
        }
            
        
    }
}]);