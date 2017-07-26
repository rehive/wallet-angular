(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        console.log('token');
        console.log(cookieManagement.getCookie('TOKEN'));
        cookieManagement.deleteCookie('TOKEN');

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
                    $rootScope.$pageFinishedLoading = true;
                    if(res.data.data && res.data.data.name){
                        $rootScope.companyName = res.data.data.name;
                        $rootScope.haveCompanyName = true;
                        $location.path('/dashboard');
                    } else {
                        $location.path('/company/name_request');
                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        }
    }
})();
