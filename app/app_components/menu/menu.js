/**
*  Module
*
* Description
*/
angular.module('menuModule', ['services'])

.controller('menuCtrl', ['$scope','shop',function ($scope,shop){
	
	var firmaId = "RMB01"

	shop.company.query({companyId:firmaId}, function (data){
        console.log(data[0]);
        shop.passCompanyInfo(data[0]);
    });
	
}])