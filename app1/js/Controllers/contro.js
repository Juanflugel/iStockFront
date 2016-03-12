angular.module('ejeController',['ejeServi'])

.controller('inputDatosController',['$scope','loStorage','alerta', function ($scope,loStorage,alerta) {

	$scope.personas=[];
	$scope.unComplete=[];

	$scope.$watch('personas', function(){
		alerta.updateTodos($scope.personas);
	});
	$scope.$watch('unComplete', function(){
		alerta.updateVacios($scope.unComplete);
	});

	$scope.archivo = $('#archivo-csv');
	$scope.archivo.on('click',function (){
		loStorage.limpiarLS();
	}); 

	$scope.archivo.on('change',function(){
		$scope.archivo.parse({
			config: {
				worker:true,
				header:true,
				complete: function(results) {
					var u = [];
					var p = results.data;
					for( i=0 ; i<p.length ; i++ ){
						if(_.contains(p[i],"")){
							u.push(p[i]);
						}
					};
					$scope.personas = p;
					$scope.unComplete = u;
					$scope.$apply();
					loStorage.guardarLS('personas',p);
					loStorage.guardarLS('vacios',u);
				}
			}      
		});
	}); 

}])
.controller('tablaCompController',['$scope','loStorage','alerta', function ($scope,loStorage,alerta) {

	$scope.personas = loStorage.llamarLS('personas') || [{Bienvenido:'Por favor Cargue su archivo CSV'}];
	$scope.tabla = {
		datos:$scope.personas,
		header:$scope.personas[0]

	};
	$scope.$on("valuesUpdated", function(){
		$scope.personas = alerta.todos;
		$scope.tabla.datos = $scope.ObjtoArray($scope.personas); 
		$scope.tabla.header = $scope.TablaHeader($scope.personas[0]);
	});

	console.log($scope.personas);

	

}])
.controller('tablaVaciosController',['$scope','loStorage','alerta', function ($scope,loStorage,alerta) {

	$scope.unComplete = loStorage.llamarLS('vacios') || [{Bienvenido:'Por favor Cargue su archivo CSV'}];
	$scope.tabla = {
		datos:$scope.unComplete,
		header:$scope.unComplete[0]
 	};
 
	$scope.$on("valuesUpdated",function(){
		$scope.unComplete = alerta.vacios;
		$scope.tabla.datos = $scope.ObjtoArray($scope.unComplete);
		$scope.tabla.header = $scope.TablaHeader($scope.unComplete[0]);
	});
}]);


	