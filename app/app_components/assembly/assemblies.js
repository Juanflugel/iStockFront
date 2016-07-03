angular.module('assemblyModule',[])

.controller('assemblyCtrl', ['$scope','shop','handleProjects',function ($scope,shop,handleProjects){

	$scope.refreshQuery = function(){
			shop.assembly.query(function (data){
				$scope.assemblies = data;
			},function (error){});
	};

	$scope.refreshQuery();

	$scope.updateAssembly = function(obj){
		const idDocument = obj._id;
		obj.projectNumber = obj.projectNumber.toUpperCase();
		shop.assemblyUpdate.update({_id:idDocument},obj,function (data){
			$scope.changeInfoProject = false;
		});
	}

	$scope.editAssembly = function(obj){
		$scope.obj = obj;
		$scope.changeInfoAssembly = true;
	}
	

	$scope.deleteAssembly = function(obj,index){
				
				const r = confirm('Are you sure to delete Assembly: '+ obj.assemblyName);
					if (r == true) {
				     shop.assembly.remove({_id:obj._id},function (data){
				     	$scope.assemblies.splice(index,1);
					 	alert('project: '+ data.assemblyName+' successfully deleted');
					 	$scope.refreshQuery();
					 });
					} else {
					    return;
					}
				
			};


	$scope.showAssemblyDetails = function(assembly){
			handleProjects.passAssembly(assembly);
		}
	
}])
.controller('assemblyDetailCtrl', ['$scope','shop','handleProjects',function ($scope,shop,handleProjects){
	var firmaId = 'RMB01';

	$scope.objAssembly = handleProjects.getCurrentAssembly();
	$scope.header = {itemCode:'Item Code',itemAmount:'Amount',itemName:'Name',itemBuyPrice:'Price'};
	$scope.collection = $scope.objAssembly.assemblyItems;

	$scope.createNewItem = function(){
		$scope.obj = {};
		$scope.editObjInAssembly = false;
		$scope.insertObjInAssembly = true;
	}
	$scope.insertItemInAssembly = function(obj){
		console.log(obj);
		var query = {};
		query.companyId = firmaId;
		query.assemblyNumber = $scope.objAssembly.assemblyNumber;
		shop.assemblyUpdate.update(query,obj,function (data){
			//console.log(data);
			$scope.collection.push(obj);
			$scope.insertObjInAssembly = false;
		},function (error){});
	}

	$scope.editItemInAssembly = function(obj){
		$scope.obj = obj;
		$scope.editObjInAssembly = true;
	}

	$scope.updateItemInAssembly = function(obj){
		var query = {};
		query.companyId = firmaId;
		query.assemblyNumber = $scope.objAssembly.assemblyNumber;
		query['assemblyItems._id'] = obj._id;

		shop.assemblyUpdate.update(query,obj,function (data){
			//console.log(data);
			$scope.editObjInAssembly = false;
		},function (error){});
	}
}])