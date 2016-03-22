angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','shop', function ($scope,shop){

	

	// Retrieve data from API the whole list without filter
	shop.items.query(function (data){
		$scope.collection = data;
	},function (error){

	})

	$scope.newObj = function (){
		$scope.obj = {};
		$scope.editItem = false;
		$scope.viewItem = false;
		$scope.justInfo = false;
		$scope.newItem = true;
	}

	$scope.createObj = function(obj){
		shop.items.save(obj,function (data){
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
		$scope.justInfo = false;
		$scope.editItem = true;
	}

	$scope.updateObj = function(obj){
		const idDocument = obj._id;
	    shop.itemidUpdate.update({_id:idDocument},obj,function(data){
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
		$scope.justInfo = true;
		$scope.viewItem = true;
		
	}
	
	
}])
.directive('settingsTable', [function (){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/settingstable/settingstable.html',		
		link: function($scope, iElm, iAttrs, controller) {
			$scope.header ={itemCode:'Item Code',itemAmount:'Amount',itemType:'Type',itemProvider:'Provider',itemBuyPrice:'Price'};
			$scope.order = function(predicate){
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    			$scope.predicate = predicate;
			}
		}
	};
}]);