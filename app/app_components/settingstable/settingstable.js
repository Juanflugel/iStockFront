angular.module('settingsTableModule',['services'])

.controller('settingsTableCtrl', ['$scope','shop', function ($scope,shop){
// function to find the remaning amount once a assembley is insert into a project
	 function sustract2arrays(a,b) { // a = array whit values from Stock ['itemCode',3]; b= array from values from the project ['itemCode',5]
		var diff = [];
		const lb = b.length;
		_.each(a,function (aObj) {
			for( i=0 ; i<lb ;i++){
				var bObj = b[i];
				if (aObj[0]==bObj[0]){
					diff.push([aObj[0],aObj[1]-bObj[1]]);
				}
			}
		});
		return diff;
	}

	function codeAndAmount (collection) {
		const sample = [];
		_.each(collection,function (obj) {
			const a = [obj.itemCode,obj.itemAmount];
			sample.push(a);
		});
		return sample;
	}

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

	var definitivo =[];
	var resumen = [];
	var sustraendo = [];

	// var sustraendo = [['DIN 912 M6X10',6],['DIN 912 M6X25',7],['DIN 912 M6X30',10],
	// 					['DIN 912 M6X40',5],['DIN 912 M8X16',7],['DIN 912 M10X30',11],
	// 					['DIN 912 M6X16',8],['DIN 912 M10X25',7],['DIN 912 M10X35',10],
	// 					['DIN 912 M10X40',5],['DIN 912 M6X50',7],['DIN 912 M6X60',11]];


	$scope.reducir = function(){ 
		resumen = codeAndAmount($scope.collection);
		sustraendo = resumen;
		console.log(sustraendo);
	}

	$scope.restar = function(){
		$scope.j = sustract2arrays(resumen,sustraendo);
	}

	$scope.queryArray = function(){
		query.array = ["DIN 912 M6X10","DIN 912 M6X12","DIN 912 M6X16","DIN 912 M6X20","DIN 912 M6X25","DIN 912 M6X30","DIN 912 M6X35","DIN 912 M6X40","DIN 912 M6X45","DIN 912 M6X50","DIN 912 M6X55","DIN 912 M6X60","DIN 912 M6X70","DIN 912 M6X80","DIN 912 M6X120","DIN 912 M8X10","DIN 912 M8X12","DIN 912 M8X16","DIN 912 M8X20","DIN 912 M8X25","DIN 912 M8X30","DIN 912 M8X35","DIN 912 M8X40"];
		shop.items.query(query,function (data){
			console.log(data);
		},function (error){});
	}
	$scope.mostrar = function(){
		console.log($scope.collection);
		console.log('5'-5);
	}
	$scope.crearSub = function(collection){
		var obj = {};
		obj.isSubAssembly = 1;
		obj.projectName = query.itemAssemblyName;
		obj.projectType = 'BAUGRUPPE';
		obj.projectItems = collection;

		shop.project.save(obj,function (data){
			console.log('todo bien primo se creo esa monda');
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