angular.module('iStock',[
	'ui.router',
	'ngMaterial',
	'table',
	'services',
  'bills',
  'inputTableModule',
  'settingsTableModule'
	])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/Bills");
  //
  // Now set up the states
  $stateProvider
    .state('Bills', {
      url: "/Bills",
      templateUrl: "app_components/views/view1.html",
      controller:'billsCtrl'
    })
    .state('Pending', {
      url: "/Pending",
      templateUrl:"app_components/views/view2.html",
      controller:'tableCtrl'
    })
    .state('allItems', {
      url: "/allItems",
      templateUrl:"app_components/views/view3.html",
      controller:'allItemsCtrl'
    })
    .state('settings', {
      url: "/settings",
      templateUrl:"app_components/views/settingsview.html",
      controller:'settingsTableCtrl'
    })
    .state('dataInput', {
      url: "/dataInput",
      templateUrl:"app_components/views/view5.html",
      controller:'inputTableCtrl'
    })
    
});