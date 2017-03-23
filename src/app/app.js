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

    //.constant('API', 'http://localhost:8080/api/3')
    .constant('API', 'https://rehive.com/api/3')

    .run(function($cookies,$rootScope,$state,tokenManagement,$location){

      var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {
        var token = tokenManagement.getToken(),
            newUrlArray = newUrl.split('/'),
            newUrlLastElement = newUrlArray[newUrlArray.length - 1];

        console.log(token);
          if(token) {
            console.log('should not be here');
            $rootScope.gotToken = true;
          } else if(newUrlLastElement == 'register'){
              // do nothing
          } else {
            $rootScope.gotToken = false;
            $location.path('/login');
          }
        })
    });


