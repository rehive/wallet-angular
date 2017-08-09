(function () {
    'use strict';

    angular.module('BlurAdmin.pages.identityVerification')
        .controller('IdentityVerificationCtrl', IdentityVerificationCtrl);

    /** @ngInject */
    function IdentityVerificationCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.address = {};
        vm.user = {};

        vm.getUserInfo = function(){
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    vm.getUserAddress();
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.getUserAddress = function(){
            $http.get(environmentConfig.API + '/user/address', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.address = res.data.data;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateUserInfo = function(){
            $http.patch(environmentConfig.API + '/user/',{first_name: vm.user.first_name,last_name: vm.user.last_name}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    vm.updateAddress();
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.updateAddress = function(){
            $http.patch(environmentConfig.API + '/user/address',$scope.address, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $location.path('document/verify')
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.userChanged = function(field){
            vm.user[field] = $scope.user[field];
        };

    }
})();
