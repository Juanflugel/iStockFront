angular.module('companyModule',[])

.controller('companyCtrl', ['$scope','shop', function ($scope,shop){

	$scope.firma = {};
	var firmaId = 'RMB01';

	shop.company.query({companyId:firmaId}, function (data){
		console.log(data);
		$scope.firma = data[0];
		$scope.employees = $scope.firma.companyUsers;

	});

	$scope.addUser = function(){
		$scope.user = {};
		$scope.modifyUser = false;
		$scope.createUser = true;
	}

	$scope.saveUser = function (obj){
		var query = {};
		query.companyId = firmaId;
		// console.log(obj._id);
		shop.companyInfoUpdate.update(query,obj,function (data){
			console.log(data);
			$scope.user = {};
			$scope.createUser = false;
		});
	}

	$scope.editUser = function(obj){
		$scope.user = obj ;
		$scope.modifyUser = true; // ng-show
		console.log($scope.user);
	}

	$scope.updateUser = function(obj){
		var query = {};
		query.companyId = firmaId;
		query['companyUsers._id'] = obj._id;
	
		console.log(query);
		shop.companyInfoUpdate.update(query,obj,function (data){
			console.log(data);
			$scope.modifyUser = false; // ng-show
		});
	}
	
}])