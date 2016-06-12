angular.module('iStock',[
	'ui.router',
	'ngMaterial',
  'menuModule',
	'table',
	'services',
  'bills',
  'projectsModule',
  'assemblyModule',
  'inputTableModule',
  'settingsTableModule',
  'companyModule'
	])
.run(function (shop){

  var firmaId = "RMB01"

  shop.company.query({companyId:firmaId}, function (data){
        console.log('from run',data[0]);
        shop.passCompanyInfo(data[0]);
    });

})
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/app/Bills");
  $urlRouterProvider.when('/app/Company','/app/Company/Employees');
  //
  // Now set up the states
  $stateProvider
   .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'app_components/menu/menu.html',
            controller:'menuCtrl'

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
    // .state('app.projectDetail', {
    //   url: "/Detail",
    //   templateUrl:"app_components/projectCard/subAssembly.html",
    //   controller:'detailsCtrl'
    // })
    .state('app.Assemblies', {
      url: "/Assemblies",
      templateUrl:"app_components/views/assemblyview.html",
      controller:'assemblyCtrl'
    })
    .state('app.AssemblyDetail', {
      url: "/AssembliesDetail",
      templateUrl:"app_components/assembly/assemblyDetail.html",
      controller:'assemblyDetailCtrl'
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
    .state('app.Company.Providers', {
      url: "/Providers",
      templateUrl:"app_components/companyView/providers.html",
      controller:'providersCtrl'
    })
    .state('app.Company.Employees', {
      url: "/Employees",
      templateUrl:"app_components/companyView/employees.html",
      controller:'companyCtrl'
    })
    
});