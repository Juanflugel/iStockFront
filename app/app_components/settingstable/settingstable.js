angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','items', function ($scope,items){


	// all related with the items
	$scope.justInfo = true;
	// Retrieve data from API the whole list without filter
	items.list.query(function (data){
		$scope.collection = data;
	},function (error){

	})

	$scope.newObj = function (){
		$scope.obj = {};
		$scope.editItem = false;
		$scope.viewItem = false;
		$scope.newUser = false;
		$scope.newItem = true;
	}

	$scope.createObj = function(obj){
		items.metodo.save(obj,function (data){
			$scope.obj = {};
			$scope.newItem = false;
			console.log('objeto guardado plenamente');
		},function (error){
			alert('error');
		})
	}
	
	$scope.editObj = function(item){		
		$scope.obj = item;
		$scope.newItem = false;
		$scope.viewItem = false;
		$scope.newUser = false;
		$scope.editItem = true;
	}

	$scope.updateObj = function(obj){
		console.log(obj);
		const idDocument = obj._id;
	    items.idUpdate.update({idDocument:idDocument},obj,function(data){
			 console.log('res:',data);			 
			 $scope.editItem = false;			 	
			 }, function(error){
			 	alert('The item amount was not updated');
			 });
	}

	$scope.readObj = function(item){
		$scope.obj = item;
		$scope.newItem = false;
		$scope.editItem = false;
		$scope.newUser = false;
		$scope.viewItem = true;
	}
	// all related with the items

	// all related with the user 
	$scope.addUser = function(){
		$scope.newItem = false;
		$scope.editItem = false;
		$scope.viewItem = false;
		$scope.newUser = true;

	}
	// all related with the user



	
	
}])
.directive('settingsTable', [function (){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/settingstable/settingstable.html',		
		link: function($scope, iElm, iAttrs, controller) {
			$scope.header =['Item Code','Name','Amount','Units','Provider','Price'];
		}
	};
}]);