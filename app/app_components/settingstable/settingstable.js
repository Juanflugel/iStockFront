angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','items', function ($scope,items){
	// Retrieve data from API the whole list without filter
	items.list.query(function (data){
		$scope.collection = data;
	},function (error){

	})
	
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