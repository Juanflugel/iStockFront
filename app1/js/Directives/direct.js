angular.module('ejeDirect',[])

.directive('lsTable', function(){

   function link(scope, element, attrs){

        scope.ObjtoArray = function(array){
         return _.map(array, function(obj){
                        //console.log(obj);
                        //console.log(_.toArray(obj));
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
         }else{
            scope.reverse = false;
            scope.predicate = val.toString();
         }
        };

        scope.tabla.datos = scope.ObjtoArray(scope.tabla.datos);
        scope.tabla.header = scope.TablaHeader(scope.tabla.header);
      // scope.limite = scope.tabla.datos.length;
   }; 
   
      return {
      restrict: 'E',
      templateUrl: "html/tabla.html",
      link: link
    
};
})
.directive('navMain', function(){

  return{
    restrict: 'E',      
      templateUrl: "html/navegacion.html",
      
  };
})
.directive('iForm', function(){

return{
  restrict:'E',
  templateUrl:'html/iform.html'
};

})
.directive('vForm',function(){
  return{
  restrict:'E',
  templateUrl:'html/vform.html'
};
});