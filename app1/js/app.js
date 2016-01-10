angular.module('eje',[
  'ui.router',
  'ejeController',
  'ejeDirect'
])

.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/Inicio");
  // Now set up the states
  $stateProvider
    .state('Inicio', {
      url: "/Inicio",
      templateUrl: "html/nuevo.html",
      controller:'tablaCompController'
    })
    .state('tabla', {
      url: "/vacios",
      templateUrl: "html/vacios.html",
      controller:'tablaVaciosController'
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});

