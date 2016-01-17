/**
*  Module
*
* Description
*/
angular.module('services', ['ngResource'])

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
      ip: '192.168.1.165',
      port: 5006,
      protocol: 'http'
  };
})

.factory('items',['$resource', 'Config', function ContenidoFactory($resource, Config){
  return {
    list : $resource('http://' + Config.ip + ':' + Config.port + '/items'),
    id: $resource('http://' + Config.ip + ':' + Config.port + '/bills',{})    
  };
}])

.factory('socketio',['$rootScope',function ($rootScope) {
  var socket = io.connect('http://localhost:5006');
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
}]);