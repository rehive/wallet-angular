'use strict';

angular.module('BlurAdmin', [
  'ngCookies',
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])

    .run(function($cookies,$rootScope,$state,tokenManagement,$location){

      var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event) {
        var token = tokenManagement.getToken();
        console.log(token);
          if(token) {
            $rootScope.gotToken = true;
          } else {
            $rootScope.gotToken = false;
            $location.path('/login');
          }
        })
    });


