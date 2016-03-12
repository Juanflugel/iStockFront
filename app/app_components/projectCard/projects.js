angular.module('projectsModule',['services'])

.controller('projectsCtrl', ['$scope','shop',function ($scope,shop){

	shop.project.query(function (data){
		$scope.projects = data;
	},function (err){});

	$scope.vaina = "entro el controlador";
	
}])

.directive('projectCard', [function (){
	// Runs during compile
	return {
		
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		 templateUrl: 'app_components/projectCard/projectCard.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);