'use strict';

angular.module('BlurAdmin', [
    'ngFileUpload',
    'ngSanitize',
    'ngCookies',
    'ui.bootstrap',
    'ui.router',
    'toastr',
    'countrySelect',
    'iso-3166-country-codes',

    'BlurAdmin.theme',
    'BlurAdmin.pages'
])

    .constant('API', 'https://staging.rehive.com/api/3')

    .run(function($cookies,$rootScope,cookieManagement,userVerification,$http,API,$location,_){

        //using to check if user has a verified email address
        var verifyUser = function (){
            userVerification.verify(function(err,verified){
                if(verified){
                    $rootScope.userVerified = true;
                } else {
                    $rootScope.userVerified = false;
                }

                getCompanyInfo();
            });
        };
        verifyUser();

        //using to check if user has a company name
        var getCompanyInfo = function () {
            var token = cookieManagement.getCookie('TOKEN');
            console.log('should have token '+ token);
            if(token && $rootScope.userVerified) {
                $http.get(API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if(res.data.data && res.data.data.name){
                            $rootScope.haveCompanyName = true;
                            $rootScope.companyName = res.data.data.name;
                        }
                    }
                }).catch(function (error) {
                    $rootScope.haveCompanyName = false;
                });
            } else {
                console.log('from apps.js comppany info function' + token);
                $location.path('/login');
            }
        };

        //using to check if user is in changing password or setting up 2 factor authentication
        $rootScope.securityConfigured = true;


        var locationChangeStart = $rootScope.$on('$locationChangeStart', function (event,newUrl) {
            routeManagement(event,newUrl);
        });



        function routeManagement(event,newUrl){

            console.log($rootScope);

            var token = cookieManagement.getCookie('TOKEN'),
                newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);

            if(newUrlLastElement == 'login'){
                console.log('from if');
                //cookieManagement.deleteCookie('TOKEN');
                $rootScope.gotToken = false;
                $rootScope.securityConfigured = true;
                $location.path('/login');
            } else{
                if(token) {
                    $rootScope.gotToken = true;
                    $rootScope.securityConfigured = true;
                } else if(newUrlLastElement == 'register' || newUrlLastElement == 'reset'
                    || newUrlLastElement == 'verification' || newUrlLastElement == 'name_request'){
                    $rootScope.securityConfigured = true;
                } else {
                    console.log('from else');
                    //cookieManagement.deleteCookie('TOKEN');
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


