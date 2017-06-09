(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,cookieManagement,API,$location,errorToasts,userVerification) {

        var vm = this;

        $scope.login = function(user, company, password) {
            $rootScope.$pageFinishedLoading = false;

            console.log(API + '/auth/login/');
            $http.post(API + '/auth/login/', {
                user: user,
                company: company,
                password: password
            }).then(function (res) {
                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    userVerification.verify(function(err,verified){
                        if(verified){
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
                $http.get(API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    $rootScope.$pageFinishedLoading = true;
                    cookieManagement.setCookie('COMPANY',res.data.data.name);
                    $location.path('/dashboard');
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        }
    }
})();
