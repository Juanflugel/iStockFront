angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','shop', function ($scope,shop){	
	var query = {};
	// Retrieve data from API the whole list without filter
	var refresh = function (){
		shop.items.query(query,function (data){
			$scope.collection = data;
		},function (error){});
	}; 

	refresh();

	$scope.newObj = function (){
		$scope.obj = {};
		$scope.editItem = false;
		$scope.viewItem = false;
		$scope.justInfo = false;
		$scope.newItem = true;
	}
	$scope.filterModel ={};
	$scope.filterBy= [  {tagToShow:'Categorie',queryObjKey:'itemCategorie',array:['Buateile','Normteile','Kaufteile','Brennteile']},
						{tagToShow:'Provider', queryObjKey:'itemProvider',array:['SMC','SCHRAUBEN KÖHLER','BREMER','Edeka']},
						{tagToShow:'Type',queryObjKey:'itemType',array:['fastfood','SCHRAUBEN','ZYLINDER']},
						{tagToShow:'BauGruppe',queryObjKey:'itemAssemblyName',array:['ABROLUNG','FORMSTATION','OBERJO']}
					 ];

	$scope.llamar = function(){

		const j = {};
		j[$scope.filterModel.queryObjKey] = $scope.queryTag;
		console.log(j);
		query = j;
		refresh();
	}
	var resumen = [];

	var sustraendo = [['DIN 912 M6X10',6],['DIN 912 M6X25',7],['DIN 912 M6X30',10]];

	$scope.reducir = function(){ 
		resumen = [];
		_.each($scope.collection,function (obj){ 
			const a = [obj.itemCode,obj.itemAmount];
			resumen.push(a);
			
		});
		console.log(resumen);
	}

	$scope.restar = function(){
			const s = sustraendo.length;
		_.each(resumen,function(arr0){
			console.log(arr0[0]);
			for(i=0;i<s;i++){ 
				if (arr0[0]==sustraendo[i][0]){
					console.log([arr0[0],(sustraendo[i][1]-arr0[1])]);
				}
			}


		});
	}
}])
// table to show, create and edit everything related to items
.directive('settingsTable', [function (){
	// Runs during compile
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'app_components/settingstable/settingstable.html',		
		link: function($scope, iElm, iAttrs, controller) {
			// header 
			$scope.header ={itemCode:'Item Code',itemAmount:'Amount',itemType:'Type',itemProvider:'Provider',itemBuyPrice:'Price'};
			// order by header Item
			$scope.order = function(predicate){
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
				$scope.predicate = predicate;
			}
			// edit a Object displayed on the table
			$scope.editObj = function(item){		
				$scope.obj = item;
				$scope.newItem = false;
				$scope.viewItem = false;
				$scope.justInfo = false;
				$scope.editItem = true;
			}
			// just display the Object Information
			$scope.readObj = function(item){
				$scope.obj = item;
				console.log( typeof $scope.obj.itemBrand);
				$scope.newItem = false;
				$scope.editItem = false;
				$scope.justInfo = true;
				$scope.viewItem = true;
				
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
}]);