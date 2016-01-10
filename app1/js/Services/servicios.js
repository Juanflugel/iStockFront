angular.module('ejeServi',[])

.factory('loStorage', function(){

	var store={ todos:[], vacios:[],

		limpiarLS: function(){
			window.localStorage.clear();
		},
		guardarLS: function (Nombre,Datos) {
			window.localStorage.setItem(Nombre,JSON.stringify (Datos));
		},
		llamarLS: function (Nombre) {
			return JSON.parse(window.localStorage.getItem(Nombre));	
		}
	};
    
	return store;
})
.factory('alerta', function($rootScope){
	var coleccion ={};

		coleccion.todos = [];
		coleccion.vacios = [];

		coleccion.updateTodos = function (col) {
			this.todos = col;
			$rootScope.$broadcast("valuesUpdated");
		}

		coleccion.updateVacios = function (vcol) {
			this.vacios = vcol;
			$rootScope.$broadcast("valuesUpdated");
		}

		return coleccion;

});