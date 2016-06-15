angular.module('pendingsModule',[])

.controller('pendingsCtrl', ['$scope','shop','handleProjects', function ($scope,shop,handleProjects){

	var itemsAndAmountsToRest = [];
	var itemsAndAmountsFrontStock = [];
	var stockminusProjects = [];

	$scope.callItemsFromStock = function(){
		shop.items.query({companyId:'RMB01'},function (data){
			itemsAndAmountsFrontStock = handleProjects.resumeCodeAndAmount(data);
			
			console.log(itemsAndAmountsFrontStock.length);
			$scope.restar();
		},function (error){});
	}
	$scope.restar = function(){
		stockminusProjects = handleProjects.subtract2arrays(itemsAndAmountsToRest,itemsAndAmountsToRest);
				console.log(stockminusProjects.length);
				$scope.mostrar = stockminusProjects;
	}

	shop.projectRequiredAmounts.query({},function (data){		
		itemsAndAmountsToRest = handleProjects.resumeCodeAndAmount(data);
		console.log(itemsAndAmountsToRest.length);
		$scope.callItemsFromStock();

	},function (error){

	});
	
	
}])