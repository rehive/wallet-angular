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

    .constant('IMAGEURL', 'https://storage.googleapis.com/rehive-static/dashboard/dist/img/tokens/')

    .run(function($cookies,$rootScope,cookieManagement,$location,_){

      var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {
        var token = cookieManagement.getCookie('TOKEN'),
            newUrlArray = newUrl.split('/'),
            newUrlLastElement = _.last(newUrlArray);

          if(token) {
            $rootScope.gotToken = true;
          } else if(newUrlLastElement == 'register' || newUrlLastElement == 'resetPassword'){
              // do nothing
          } else {
            $rootScope.gotToken = false;
            $location.path('/login');
          }
        })
    });


