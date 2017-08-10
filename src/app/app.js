'use strict';

angular.module('BlurAdmin', [
    'BlurAdmin.config',
    'cp.ngConfirm',
    'ngFileUpload',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'toastr',
    'countrySelect',
    'iso-3166-country-codes',
    'ngIntlTelInput',
    'BlurAdmin.theme',
    'BlurAdmin.pages'
])
    .config(function (ngIntlTelInputProvider) {
        ngIntlTelInputProvider.set({utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.1/js/utils.js'});
    })

    .run(function($cookies,$rootScope,cookieManagement,$state,$stateParams,errorHandler,errorToasts,
                  userVerification,$http,environmentConfig,$window,$location,_){

        $window.onload = function(){
            $rootScope.$pageFinishedLoading = true;
        };


        //using to check if user is registering or not
        $rootScope.notRegistering = true;


        var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {

            routeManagement(event,newUrl);
        });



        function routeManagement(event,newUrl){
            var token = cookieManagement.getCookie('TOKEN'),
                newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);

            var getUserInfo = function(){
                if(token){
                    $http.get(environmentConfig.API + '/user/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }).then(function (res) {
                        if (res.status === 200) {
                            $rootScope.USER = res.data.data;
                        }
                    }).catch(function (error) {
                        errorToasts.evaluateErrors(error.data);
                    });
                }
            };
            getUserInfo();

            if(newUrlLastElement == 'login'){
                cookieManagement.deleteCookie('TOKEN');
                cookieManagement.deleteCookie('USER');
                $rootScope.USER = {};
                $rootScope.gotToken = false;
                $rootScope.notRegistering = true;
                $location.path('/login');
            } else{
                if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
                    || newUrl.indexOf('reset/confirm') > 0 || newUrl.indexOf('mobile/verify') > 0
                    || newUrl.indexOf('mobile/confirm') > 0 || newUrl.indexOf('email/verify') > 0
                    || newUrl.indexOf('document/verify/ID') > 0 || newUrl.indexOf('/document/verify/residence') > 0
                    || newUrl.indexOf('email/verify') > 0 || newUrl.indexOf('ethereum/address') > 0
                    || newUrl.indexOf('identity/verification') > 0)
                {
                    $rootScope.notRegistering = false;
                } else if (token) {
                    $rootScope.notRegistering = true;
                    $rootScope.gotToken = true;
                } else {
                    $rootScope.gotToken = false;
                    $location.path('/login');
                }

            }
        }
    });