angular.module('bills',[])

.directive('iBill', [function(){
	// Runs during compile
	return {		
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/bills/bill.html'		
	};
}])
.controller('billsCtrl', ['$scope', function($scope){
	var date = new Date();
	$scope.bills =[{
		providerName:'SMC',
		soldItems:[1,2,3,4,5,6],
		billDate:date,
		providerImage:"http://www.gmkfreelogos.com/logos/S/img/SMC.gif"
	},
	{
		providerName:'Juan',
		soldItems:[1,2,3,4,5,6],
		billDate:date,
		providerImage:"http://www.gmkfreelogos.com/logos/S/img/SMC.gif"
	}
	];
}])