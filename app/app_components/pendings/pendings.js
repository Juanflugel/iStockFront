angular.module('pendingsModule',[])

.controller('pendingsCtrl', ['$scope','shop','handleProjects', function ($scope,shop,handleProjects){

var query = {};
query.companyId = 'RMB01';
query.projectState = 'open';

$scope.filterBy = shop.getCompanyFilters();
console.log($scope.filterBy);
$scope.queryItems = function(){
		const j = {};
		j[$scope.filterModel.queryObjKey] = $scope.queryTag;
		console.log(j);
		
		$scope.filtrar = j;
	}	

	shop.prueba.query(query,function (data){
		console.log(data.length,new Date(),query);
		$scope.viewItems = data;
	},function (error){});
	
	
}])









	// var itemsAndAmountsToRest = [];
	// var itemsAndAmountsFrontStock = [];
	// var stockminusProjects = [];

	// $scope.callItemsFromStock = function(){
	// 	shop.items.query({companyId:'RMB01'},function (data){
	// 		itemsAndAmountsFrontStock = handleProjects.resumeCodeAndAmount(data);
			
	// 		console.log(itemsAndAmountsFrontStock.length);
	// 		$scope.restar();
	// 	},function (error){});
	// }
	// $scope.restar = function(){
	// 	stockminusProjects = handleProjects.subtract2arrays(itemsAndAmountsFrontStock,itemsAndAmountsToRest);
	// 			console.log(stockminusProjects.length,new Date());
				
	// 			$scope.mostrar = stockminusProjects;
				

	// }

	// $scope.negativos = function(){
	// 	var negativos = handleProjects.checkIfNegative(stockminusProjects);
	// 	console.log(negativos.length);
	// }

	// shop.projectRequiredAmounts.query({},function (data){		
	// 	itemsAndAmountsToRest = handleProjects.resumeCodeAndAmount(data);
	// 	console.log(itemsAndAmountsToRest.length);
	// 	$scope.callItemsFromStock();

	// },function (error){

	// });