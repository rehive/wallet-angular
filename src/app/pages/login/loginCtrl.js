(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        cookieManagement.deleteCookie('TOKEN');
        $scope.gotCompanyName = false;
        $scope.path = $location.path();

        $scope.login = function(user, company, password) {
            $rootScope.$pageFinishedLoading = false;

            $http.post(environmentConfig.API + '/auth/login/', {
                user: user,
                company: company,
                password: password
            }).then(function (res) {
                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    userVerification.verify(function(err,verified){
                        if(verified){
                            $rootScope.userVerified = true;
                            vm.getCompanyInfo(res.data.data.token);
                        } else {
                            $rootScope.$pageFinishedLoading = true;
                            $rootScope.userVerified = false;
                            $location.path('/verification');
                        }
                    });

                }
            }).catch(function (error) {
                $scope.gotCompanyName = false;
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.getCompanyInfo = function (token) {
            if(token) {
                $http.get(environmentConfig.API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if(res.data.data && res.data.data.name){
                        $rootScope.companyName = res.data.data.name;
                        $rootScope.haveCompanyName = true;
                        vm.getCompanyCurrencies(token);
                    } else {
                        $rootScope.$pageFinishedLoading = true;
                        $rootScope.newUser = true;
                        $location.path('/company/name_request');
                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getCompanyCurrencies = function(token){
            if(token){
                $http.get(environmentConfig.API + '/admin/currencies/?enabled=true', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if(res.data.data.results.length == 0){
                            $rootScope.newUser = true;
                            $location.path('currency/add');
                        } else {
                            $rootScope.newUser = false;
                            $location.path('/dashboard');
                        }
                        $rootScope.$pageFinishedLoading = true;
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
    }
})();
