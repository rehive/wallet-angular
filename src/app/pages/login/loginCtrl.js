(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,stringService) {

        var vm = this;

        $scope.login = function(identifier, company_id, password) {
            $rootScope.$pageFinishedLoading = false;

            $http.post(API + '/auth/login/', {
                identifier: identifier,
                company_id: company_id,
                password: password
            }).then(function (res) {

                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    vm.getCompanyInfo(res.data.data.token);
                    toastr.success('You have successfully logged in with the email address ' + res.data.data.user.email +'!');
                }
            }).catch(function (error) {
                console.log(error);
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
