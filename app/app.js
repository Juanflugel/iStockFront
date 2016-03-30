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
    .state('Projects', {
      url: "/Projects",
      templateUrl:"app_components/views/projectsview.html",
      controller:'projectsCtrl'
    })
   /* .state('Projects.main', {
      url: "/main",
      template:"<project-card></project-card>",
      controller:'projectsCtrl'
    })
    .state('Projects.sub', {
      url: "/sub",
      template:"",
      controller:'projectsCtrl'
    })*/
    .state('Settings', {
      url: "/Settings",
      templateUrl:"app_components/views/settingsview.html",
      controller:'settingsTableCtrl'
    })
    // .state('dataInput', {
    //   url: "/dataInput",
    //   templateUrl:"app_components/views/view5.html",
    //   controller:'inputTableCtrl'
    // })
    .state('Company', {
      url: "/Company",
      templateUrl:"app_components/companyView/company.html",
      controller:'companyCtrl'
    })
    
});