angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','shop','$timeout',function ($scope,shop,$timeout){

	$scope.itemsNewAssembly = []; // collection with all the items which belong to a new assembly
	var query = {itemType:'SCHRAUBE'}; //itemMaterial:"S235 JR" query inicial
	$scope.filterModel = {};
	// Retrieve data from API the whole list without filter
	$scope.refresh = function (){
		shop.items.query(query,function (data){
			$scope.collection = data;
			console.log($scope.collection.length);
		},function (error){});
	}; 
 	// dale tiempo para que la info pase al servicio
	$timeout(function(){
		$scope.firmaId = shop.getCompanyId(); // esto hay que traerlo desde un servicio que se valide por login
		$scope.filterBy = shop.getCompanyFilters();
		query.companyId = $scope.firmaId;
		$scope.refresh();
	},30);	

	$scope.queryItems = function(){
		const j = {};
		j[$scope.filterModel.queryObjKey] = $scope.queryTag;
		console.log(j);
		query = j;
		query.companyId = $scope.firmaId;
		$scope.refresh();
	}	

	$scope.newAssembly = function(){		
		$scope.createAssembly = true;
		$scope.newItem = false;
		$scope.viewItem = false;
		$scope.justInfo = false;
		$scope.editItem = false;
	}

	$scope.insertItemInAssembly = function(){

		var al = $scope.collection.length;
		var stuck = $scope.collection;

		for (i=0;i<al;i++){
			if (stuck[i].insert == true){
				$scope.itemsNewAssembly.push(stuck[i]);
				console.log($scope.itemsNewAssembly);
			}
		}
	}

	$scope.newObj = function (){
		$scope.obj = {};
		$scope.createAssembly = false;
		$scope.editItem = false;
		$scope.viewItem = false;
		$scope.justInfo = false;
		$scope.newItem = true;
	}

	$scope.crearSub = function(collection){
		var obj = {};
		obj.isSubAssembly = 1;
		obj.projectName = $scope.assembly.projectName;
		obj.projectNumber = $scope.assembly.projectNumber;
		obj.projectType = 'BAUGRUPPE';
		obj.projectItems = $scope.itemsNewAssembly;
		obj.companyId = $scope.firmaId;
		obj.deadLine = new Date();

		shop.project.save(obj,function (data){
			console.log('todo bien primo se creo esa monda'+ data);
		});

		$scope.createAssembly = false;

	}	

}])
// table to show, create and edit everything related to items
.directive('settingsTable', ['shop',function (shop){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/settingstable/settingstable.html',		
		link: function($scope, iElm, iAttrs, controller) {
			// header 
			$scope.header = {itemCode:'Item Code',itemAmount:'Amount',itemType:'Type',itemName:'Name',itemBuyPrice:'Price'};
			// order by header Item
			$scope.order = function(predicate){
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
				$scope.predicate = predicate;
			}
			// edit a Object displayed on the table
			$scope.editObj = function(item){		
				$scope.obj = item;
				$scope.createAssembly = false;
				$scope.newItem = false;
				$scope.viewItem = false;
				$scope.justInfo = false;
				$scope.editItem = true;
			}
			// just display the Object Information
			$scope.readObj = function(item){
				$scope.obj = item;
				console.log( typeof $scope.obj.itemBrand);
				$scope.createAssembly = false;
				$scope.newItem = false;
				$scope.editItem = false;
				$scope.justInfo = true;
				$scope.viewItem = true;
				
			}

			$scope.deleteObj = function(item,index){

				const r = confirm('Are you sure to delete Item: '+ item.itemName);
					if (r == true) {
				     shop.items.remove({_id:item._id},function (data){
				     	$scope.collection.splice(index,1);
					 	alert('Item: '+ data.itemName+' successfully deleted');
					 	$scope.refresh();
					 });
					} else {
					    return;
					}

			}


		}
	};
}])
// form to show, create and edit everithing related to items
.directive('itemForm', ['shop',function (shop){
	// Runs during compile
	return {	
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/settingstable/itemForm.html',		
		link: function($scope, iElm, iAttrs, controller) {

				$scope.createObj = function(obj){
					obj.companyId = $scope.firmaId;
					shop.items.save(obj,function (data){
						$scope.obj = {};
						$scope.newItem = false;
						console.log('objeto guardado plenamente');
					},function (error){
						alert('error');
					})
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
		}
	};
}])
.directive('viewHeader',[function(){
		return {
			restrict:'E',
			templateUrl:'app_components/settingstable/viewHeader.html',
			link: function ($scope, iElm, iAttrs, controller){
				
			}
		};
}])

.directive('createAssemblyHeader',[function(){
		return {
			restrict:'E',
			templateUrl:'app_components/settingstable/createAssemblyHeader.html',
			link: function ($scope, iElm, iAttrs, controller){
				
			}
		};
}])

.directive('contenteditable', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				// view -> model
				elm.bind('blur', function() {
					scope.$apply(function() {
						ctrl.$setViewValue(elm.html());
					});
				});

				// model -> view
				ctrl.$render = function() {
					elm.html(ctrl.$viewValue);
				};

				// load init value from DOM
				//ctrl.$setViewValue(elm.html());
			}
		};
	});


	// // auxilar forms setted false 
	// $scope.createAssembly = false;
	// $scope.newItem = false;
	// $scope.viewItem = false;
	// $scope.justInfo = false;
	// $scope.editItem = false;
	// // auxilar forms setted false 