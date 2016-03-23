angular.module('projectsModule',['services'])

.controller('projectsCtrl', ['$scope','shop',function ($scope,shop){

	var firmaId = 'RMB01';

	shop.project.query({companyId:firmaId},function (data){
		$scope.projects = data;
	},function (err){});

	$scope.vaina = "entro el controlador";
	// change name, number, type or dead line from a project
	$scope.editProject = function(obj) {
		const deadLine = new Date(obj.deadLine);		
		$scope.obj = obj;
		$scope.obj.deadLine = deadLine;
		$scope.changeInfoProject = true;

	};

	$scope.updateProject = function(obj){
		const idDocument = obj._id;
		shop.projectUpdate.update({_id:idDocument},obj,function (data){
			console.log(data);
			$scope.changeInfoProject = false;
		});
	}

	$scope.showNewProject = function(){
		$scope.obj= {};
		$scope.newProject = true;
	}

	$scope.createProject = function(obj){
		shop.project.save(obj,function (data){
			console.log(data);
		});
	}

	$scope.deleteProject = function(obj){
		shop.project.remove({_id:obj._id},function (data){
			console.log(data);
		});
	}
	
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