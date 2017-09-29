'use strict';

angular.module('BlurAdmin', [
    'BlurAdmin.config',
    'cp.ngConfirm',
    'ngFileUpload',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'ngclipboard',
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
                            var switches = $rootScope.USER.switches.find(function(element){
                                return element.tx_type === "credit";
                            });
                            if(typeof(switches) != 'undefined'){
                                $rootScope.creditSwitch = switches.enabled;
                            }
                            else {
                                $rootScope.creditSwitch = true;
                            }
                        }
                    }).catch(function (error) {
                        errorToasts.evaluateErrors(error.data);
                    });
                }
            };
            
            if(newUrlLastElement == 'login'){
                cookieManagement.deleteCookie('TOKEN');
                cookieManagement.deleteCookie('USER');
                $rootScope.USER = {};
                $rootScope.gotToken = false;
                $rootScope.notRegistering = true;
                $rootScope.registerProgress = false;
                $location.path('/login');
            } else{
                if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
                    || newUrl.indexOf('reset/confirm') > 0 || newUrl.indexOf('email/verify') > 0
                    || newUrl.indexOf('email-verify/') > 0 || newUrl.indexOf('password-reset-confirm/') > 0
                    // || newUrl.indexOf('document/verify/ID') > 0 || newUrl.indexOf('/document/verify/residence') > 0
                    // || newUrl.indexOf('ethereum/address') > 0 || newUrl.indexOf('identity/verification') > 0
                    || newUrl.indexOf('authentication/multi-factor/sms') > 0 || newUrl.indexOf('/authentication/multi-factor/verify/token') > 0
                    || newUrl.indexOf('/authentication/multi-factor') > 0)
                {
                    $rootScope.notRegistering = false;
                    $rootScope.registerProgress = false;
                } else if (token) {
                    $rootScope.notRegistering = true;
                    $rootScope.gotToken = true;
                    $rootScope.registerProgress = false;
                    if(newUrl.indexOf('home') > 0 || newUrl.indexOf('mobile/confirm') > 0 || newUrl.indexOf('mobile/verify') > 0
                        || newUrl.indexOf('document/verify/ID') > 0 || newUrl.indexOf('/document/verify/residence') > 0
                        || newUrl.indexOf('ethereum/address') > 0 || newUrl.indexOf('identity/verification') > 0)
                    {
                        $rootScope.registerProgress = true;
                    }
                    getUserInfo();
                } else {
                    $rootScope.gotToken = false;
                    $rootScope.registerProgress = false;
                    $location.path('/login');
                }

            }
        }
    });