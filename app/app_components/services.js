/**
*  Module
*
* Description
*/
angular.module('services', ['ngResource'])

.constant('filters',{
  'filterCollection':[ {tagToShow:'Categorie',queryObjKey:'itemCategorie',array:['BAUTEILE','NORMTEILE','KAUFTEILE','BRENTEILE']},
            {tagToShow:'Provider', queryObjKey:'itemProvider',array:['SMC','SCHRAUBEN KÖHLER','BREMER','IFM','INA FAG','STANITECH','HASCO','FESTO','GANTER','TORWEGGE','KTR']},
            {tagToShow:'Type',queryObjKey:'itemType',array:['FERTIGUNSTEILE','LAGER','SCHRAUBE','ZYLINDER','MUTTER','SCHEIBE']},
            {tagToShow:'BauGruppe',queryObjKey:'itemAssemblyName',array:['ABFALLAUFWICKLUNG','ABROLLBOCK','HEIZUNG','GRUNDRAHMEN','FOLIENTRANSPORT','FORMSTATION MIT HEBELANTRIEB','STAPELWAGEN AJOVER','OBERJOCHVERSTELLUNG','SERVOVORSTRECKER','FOLIENUMLENKUNG']}
           ]
})

.factory('$loStorage', function(){

	var store = { todos:[], vacios:[],

		cleanLS: function(){
			window.localStorage.clear();
		},
		setObject: function (key,Object) {
			window.localStorage.setItem (key,angular.toJson (Object));
		},
		getObject: function (key) {
			return JSON.parse(window.localStorage.getItem(key));	
		},
		removeObject: function(key){
			window.localStorage.removeItem(key);
		}
	};
    
	return store;
})

.factory('Config', function () {
  return {
      version : '0.0.1',
      ip: 'localhost', //www.estock.website
      port: 5006,
      protocol: 'http'
  };
})

.factory('shop',['$resource', 'Config', function ContenidoFactory($resource, Config){
  return {
    list : $resource('http://' + Config.ip + ':' + Config.port + '/items'),
    items: $resource('http://' + Config.ip + ':' + Config.port + '/items',{}),
    itemidUpdate:$resource('http://' + Config.ip + ':' + Config.port + '/items',{},{ update: {method: 'PUT'}}),
    project:$resource('http://' + Config.ip + ':' + Config.port + '/projects',{}),
    projectGeneralView:$resource('http://' + Config.ip + ':' + Config.port + '/projectGeneralView',{}),
    projectUpdate:$resource('http://' + Config.ip + ':' + Config.port + '/projects',{},{ update: {method: 'PUT'}}),
    company: $resource('http://' + Config.ip + ':' + Config.port + '/company',{}),
    companyInfoUpdate:$resource('http://' + Config.ip + ':' + Config.port + '/company',{},{ update: {method: 'PUT'}})
  };
}])

.factory('socketio',['$rootScope',function ($rootScope) {
  var socket = io.connect('http://tsjuan.ddns.net:5006');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}])

.factory('handleProjects', function ($rootScope) {

  var currentProject={};
  var detalle ={};
  var toBuy = {};

  return {
    updateBills:function(){
      $rootScope.$broadcast('newBill');
    },
    updateBuyList:function(){
      $rootScope.$broadcast('newProductToBuy');
    },
    passProject: function(obj){
      currentProject = obj;
      console.log(currentProject);
    },
    remove: function(bill) {
      bills.splice(bills.indexOf(bill), 1);
    },
    getCurrentProject: function() {
      console.log('me llamaron:'+currentProject);
      return currentProject;

    },
    passProduct: function(obj){
       detalle = obj;
    },
    getCurrentProduct: function(){
      return detalle;
    }
  }
})