'use strict';

angular.module('BlurAdmin', [
    'ngFileUpload',
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
    'countrySelect',
    'angular-progress-button-styles',
    'iso-3166-country-codes',

    'BlurAdmin.theme',
    'BlurAdmin.pages'
])

    .constant('API', 'https://rehive.com/api/3')

    .run(function($cookies,$rootScope,cookieManagement,userVerification,$location,_){

        //using to check if user has a verified email address
        $rootScope.userVerified = true;

        //using to check if user is in changing password or setting up 2 factor authentication
        $rootScope.securityConfigured = true;


        var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {
            routeManagement(event,newUrl);
        });

        function routeManagement(event,newUrl){

            var token = cookieManagement.getCookie('TOKEN'),
                newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);

            if(token) {
                $rootScope.gotToken = true;
            } else if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
                || newUrlLastElement == 'verification' || newUrlLastElement == 'name_request'){
                // do nothing
            } else {
                $rootScope.gotToken = false;
                $location.path('/login');
            }

            //checking if changing password or setting up 2 factor authentication
            if(newUrlLastElement == 'change' || newUrlLastElement == 'two-factor'){
                $rootScope.securityConfigured = false;
            }
        }
    });


