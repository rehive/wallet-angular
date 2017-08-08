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


        //using to check if user is in changing password or setting up 2 factor authentication
        $rootScope.securityConfigured = true;


        var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {

            //using to check if user has a verified email address
            var verifyUser = function (){
                userVerification.verify(function(err,verified){
                    if(verified){
                        $rootScope.userVerified = true;
                        getCompanyInfo();
                    } else {
                        $rootScope.userVerified = false;
                    }
                });
            };
            verifyUser();

            //using to check if user has a company name
            var getCompanyInfo = function () {
                var token = cookieManagement.getCookie('TOKEN');
                if(token && $rootScope.userVerified) {
                    $http.get(environmentConfig.API + '/admin/company/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }).then(function (res) {
                        if (res.status === 200) {
                            if(res.data.data && res.data.data.name){
                                $rootScope.haveCompanyName = true;
                                $rootScope.companyName = res.data.data.name;
                                getCompanyCurrencies(token);
                            } else {
                                $location.path('/company/name_request');
                            }
                        }
                    }).catch(function (error) {
                        $rootScope.haveCompanyName = false;
                    });
                } else {
                    $location.path('/login');
                }
            };

            //using to check if user has at least one currency
            var getCompanyCurrencies = function(token){
                if(token){
                    $http.get(environmentConfig.API + '/admin/currencies/?enabled=true', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }).then(function (res) {
                        if (res.status === 200) {
                            if(res.data.data.results.length == 0){
                                $rootScope.newUser = true;
                            }
                        }
                    }).catch(function (error) {
                        if(error.status == 403){
                            errorHandler.handle403();
                            return
                        }
                        errorToasts.evaluateErrors(error.data);
                    });
                }
            };

            routeManagement(event,newUrl);
        });



        function routeManagement(event,newUrl){
            var token = cookieManagement.getCookie('TOKEN'),
                newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);

            if(newUrlLastElement == 'login'){
                cookieManagement.deleteCookie('TOKEN');
                $rootScope.gotToken = false;
                $rootScope.securityConfigured = true;
                $location.path('/login');
            } else{
                if(token) {
                    $rootScope.gotToken = true;
                    $rootScope.securityConfigured = true;
                } else if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
                    || newUrlLastElement == 'name_request'|| newUrl.indexOf('mobile/verify') > 0
                    || newUrl.indexOf('mobile/confirm') > 0 || newUrl.indexOf('email/verify') > 0
                    || newUrl.indexOf('reset/confirm') > 0 || newUrl.indexOf('document/verify') > 0
                    || newUrl.indexOf('email/verify') > 0 || newUrl.indexOf('ethereum/address') > 0
                    || newUrl.indexOf('identity/verification') > 0)
                {
                    $rootScope.securityConfigured = true;
                } else {
                    $rootScope.securityConfigured = true;
                    $rootScope.gotToken = false;
                    $location.path('/login');
                }

            }

            //checking if changing password or setting up 2 factor authentication
            if(newUrlLastElement == 'change' || newUrlLastElement == 'two-factor'){
                $rootScope.securityConfigured = false;
            }
        }
    });

// else if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
//     || newUrlLastElement == 'verification' || newUrlLastElement == 'name_request'
//     || newUrl.indexOf('mobile/verify') > 0 || newUrl.indexOf('mobile/confirm') > 0
//     || newUrl.indexOf('reset/confirm') > 0 || newUrl.indexOf('email/verify') > 0
//     || newUrl.indexOf('document/verify') > 0)
// {
// =======
// || newUrlLastElement == 'verification' || newUrlLastElement == 'name_request' || newUrl.indexOf('mobile/verify') > 0 || newUrl.indexOf('mobile/confirm') > 0 ){
//     $rootScope.securityConfigured = true;
// } else if(newUrl.indexOf('reset/confirm') > 0 || newUrl.indexOf('email/verify') > 0 || newUrl.indexOf('ethereum/address') > 0 || newUrl.indexOf('identity/verification') > 0){
// >>>>>>> 23360c08008aa24bca7ffadbc9aa071a43731eab
//     $rootScope.securityConfigured = true;
// }