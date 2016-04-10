angular.module('iStock',[
	'ui.router',
	'ngMaterial',
	'table',
	'services',
  'bills',
  'projectsModule',
  'inputTableModule',
  'settingsTableModule',
  'companyModule'
	])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/app/Bills");
  //
  // Now set up the states
  $stateProvider
   .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'app_components/menu/menu.html',
            controller: function(){
              console.log('pleno');
            }

        })
    .state('app.Bills', {
      url: "/Bills",
      templateUrl: "app_components/views/view1.html",
      controller:'billsCtrl'
    })
    .state('app.Pending', {
      url: "/Pending",
      templateUrl:"app_components/views/view2.html",
      controller:'tableCtrl'
    })
    .state('app.Projects', {
      url: "/Projects",
      templateUrl:"app_components/views/projectsview.html",
      controller:'projectsCtrl'
    })
    .state('app.projectDetail', {
      url: "/Detail",
      templateUrl:"app_components/projectCard/subAssembly.html",
      controller:'detailsCtrl'
    })
    .state('app.Settings', {
      url: "/Settings",
      templateUrl:"app_components/views/settingsview.html",
      controller:'settingsTableCtrl'
    })
    .state('app.Company', {
      url: "/Company",
      templateUrl:"app_components/companyView/company.html",
      controller:'companyCtrl'
    })
    
});