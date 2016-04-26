angular.module('projectsModule',['services'])

.controller('projectsCtrl', ['$scope','shop','handleProjects',function ($scope,shop,handleProjects){

	$scope.projectTypes = ['TOOL','MACHINE'];

	var query = {};

	var firmaId = 'RMB01';
	$scope.projects = [];

	shop.project.query(); 

	$scope.callQuery = function(){
		// query para traer todos los proyectos con costo total
		shop.projectGeneralView.query(function (data){
		$scope.modelo = [];		
		_.each(data,function (obj){
			const preObj = obj._id;
			preObj.totalProjectCost = obj.totalProjectCost;
            /*console.log(preObj);*/
			$scope.modelo.push(preObj);
		});

		$scope.projects = $scope.modelo;

		},function (err){});
	}
	
	$scope.callQuery();

	
	
	// change name, number, type or dead line from a project	

	$scope.updateProject = function(obj){
		const idDocument = obj._id;
		obj.projectNumber = obj.projectNumber.toUpperCase();
		shop.projectUpdate.update({_id:idDocument},obj,function (data){
			console.log(data);
			$scope.changeInfoProject = false;
		});
	}

	$scope.showNewProject = function(){
		$scope.obj = {};
		$scope.newProject = true; // ng-show
	}

	$scope.showProjectDetails = function(obj){
		handleProjects.passProject(obj);
	}
	
}])
.controller('detailsCtrl',['$scope','shop','handleProjects',function ($scope,shop,handleProjects){

	var currentProject = handleProjects.getCurrentProject();
	var query ={};
	query._id = currentProject._id;

	shop.project.query(query,function (data){
		const query = {};
		const stockAmount = [];
		query.companyId = "RMB01";
		console.log(data[0]);
		$scope.project = data[0];
		$scope.collection = $scope.project.projectItems;
		query.array = handleProjects.getJustCode($scope.collection);
		//console.log(query.array.length);
		shop.items.query(query,function (data){
			var sd = handleProjects.addAmountFromStock($scope.collection,data);
			console.log(sd);
			$scope.collection = sd;
		})

	},function(err){});

	// header 
	$scope.header = {itemCode:'Item Code',itemAmount:'Amount',itemStockAmount:'Stock',itemName:'Name',itemBuyPrice:'Price'};
			// order by header Item
	$scope.order = function(predicate){
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	}

}])

.directive('projectCard', ['shop',function (shop){
	// Runs during compile
	return {
		
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		 restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		 templateUrl: 'app_components/projectCard/projectCard.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			$scope.isSubAssembly = 0;

			$scope.editProject = function(obj) {
				console.log(obj);
				const deadLine = new Date(obj.deadLine);		
				$scope.obj = obj;
				$scope.obj.deadLine = deadLine;
				$scope.changeInfoProject = true;

			};

			$scope.deleteProject = function(obj,index){
				
				const r = confirm('Are you sure to delete project: '+ obj.projectName);
					if (r == true) {
				     shop.project.remove({_id:obj._id},function (data){
				     	$scope.projects.splice(index,1);
					 	alert('project: '+ data.projectName+' successfully deleted');
					 	$scope.callQuery();
					 });
					} else {
					    return;
					}
				
			}

			$scope.createProject = function(obj){
				obj.projectState = 'open';
				obj.isSubAssembly = 0;
				obj.companyId = 'RMB01';
				obj.projectItems = [{itemAmount:1}];
				shop.project.save(obj,function (data){
					console.log(data);
					$scope.newProject = false; // ng-show
					$scope.projects.push(data);
				});
			}
			
		}
	};
}]);