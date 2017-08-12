(function () {
    'use strict';

    angular.module('BlurAdmin.pages.identityVerification')
        .controller('IdentityVerificationCtrl', IdentityVerificationCtrl);

    /** @ngInject */
    function IdentityVerificationCtrl($rootScope, $scope, $http, cookieManagement, environmentConfig, $location, errorToasts, userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingBasicInfoView = true;
        $scope.showAuthNav = false;
        $scope.address = {};
        vm.user = {};

        vm.getUserInfo = function () {
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    $scope.showAuthNav = true;
                    vm.getUserAddress();
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.getUserAddress = function () {
            $http.get(environmentConfig.API + '/user/address/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.loadingBasicInfoView = false;
                    $scope.address = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateUserInfo = function () {
            $scope.loadingBasicInfoView = true;
            $http.patch(environmentConfig.API + '/user/', {
                first_name: vm.user.first_name,
                id_number: vm.user.id_number,
                last_name: vm.user.last_name
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    vm.updateAddress();
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.updateAddress = function () {
            $http.patch(environmentConfig.API + '/user/address/', $scope.address, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.loadingBasicInfoView = false;
                    $location.path('document/verify/ID')
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.userChanged = function (field) {
            vm.user[field] = $scope.user[field];
        };

        $scope.goToNextView = function () {
            $location.path('document/verify/ID');
        }

    }
})();
