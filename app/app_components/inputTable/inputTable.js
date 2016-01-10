/**
*  Module
*
* Description
*/
angular.module('inputTableModule', [])

.controller('inputTableCtrl', ['$scope', function ($scope){
    var stock = new localStorageDB('stock', localStorage);
    $scope.stock = stock;

    if ($scope.stock.tableExists('items')){
        $scope.collection = $scope.stock.queryAll('items');
    } 
    else{
        $scope.collection = [];
    } 
    

}])

.directive('inputTable', [ function(){


    // Runs during compile
    return {
        
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
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
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'app_components/table/input.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
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
                                    // console.log(result.data);                                    
                                    $scope.prueba = result.data;
                                    var l = $scope.prueba.length;
                                    $scope.prueba.splice((l-1),1);
                                    console.log( l,$scope.prueba);
                                    // $loStorage.setObject('table',scope.prueba);                                                                 
                                    // var d = $loStorage.getObject('table');
                                    // console.log('antes:',d);
                                    $scope.stock.createTableWithData('items', $scope.prueba);
                                    // scope.table.data = scope.stock.queryAll('items');
                                    // scope.table.header = _.keys(scope.table.data[0]);
                                    // scope.table.data = scope.ObjtoArray(scope.table.data);
                                    $scope.stock.commit();
                                    $scope.collection =$scope.stock.queryAll('items');
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