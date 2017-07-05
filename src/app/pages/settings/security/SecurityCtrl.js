(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SecurityCtrl', SecurityCtrl);

    /** @ngInject */
    function SecurityCtrl($scope,$uibModal,$location,API,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingAPITokens = true;
        $scope.addingToken = false;
        $scope.createTokenData = {};
        $scope.createTokenData.tokenPassword = '';

        vm.getTokensList = function () {
            if(vm.token) {
                $scope.loadingAPITokens = true;
                $http.get(API + '/auth/tokens/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAPITokens = false;
                    if (res.status === 200) {
                        $scope.tokensList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAPITokens = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getTokensList();

        $scope.addToken = function(){
            if(vm.token) {
                $http.post(API + '/auth/tokens/',{password: $scope.createTokenData.tokenPassword}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 201) {
                        $scope.createTokenData.tokenPassword = '';
                        $scope.addingToken = false;
                        vm.getTokensList();
                        vm.openShowTokenModal('app/pages/settings/security/tokens/showTokenModal/showTokenModal.html','md',res.data.data.token);
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.openDeleteTokenModal = function (page, size,token) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'DeleteTokenModalCtrl',
                scope: $scope,
                resolve: {
                    token: function () {
                        return token;
                    }
                }
            });
        };

        vm.openShowTokenModal = function (page, size,token) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'ShowTokenModalCtrl',
                scope: $scope,
                resolve: {
                    token: function () {
                        return token;
                    }
                }
            });
        };

        $scope.goToAddTokenView = function(){
            $scope.addingToken = true;
        };

        $scope.goBackToListTokensView = function () {
            $scope.addingToken = false;
        };

        $scope.changePassword = function(){
            $location.path('/password/change');
        };

        $scope.enableTwoFactorAuth = function(){
            $location.path('/authentication/two-factor');
        };

    }
})();
