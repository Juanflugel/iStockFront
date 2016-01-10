angular.module('formular',[
	'ejeDirect'
	])
.controller('formularController',['$scope',function ($scope) {

	$scope.Datos= JSON.parse(localStorage.getItem('datos')) ||[];
	$scope.D={};
	$scope.NewD = function(D){
		$scope.Datos.push($scope.D);
		$scope.D={};
		localStorage.setItem('datos',JSON.stringify($scope.Datos));
		console.log($scope.Datos);
	};

	

}])


