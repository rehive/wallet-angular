(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ethereumAddress')
        .controller('EthereumAddressCtrl', EthereumAddressCtrl);

    /** @ngInject */
    function EthereumAddressCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.ethereum = {address: ''};
        $scope.showAuthNav = false;
        $scope.loadingEtheriumView = true;

        vm.getUserInfo = function(){
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    $scope.showAuthNav = true;
                    vm.getEthereumAddresses();
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.getEthereumAddresses = function(){
            $http.get(environmentConfig.API + '/user/bitcoin-accounts/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.length > 0){
                        $location.path('/home')
                    }
                    $scope.loadingEtheriumView = false;
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.addEthereumAddress = function(address){
            $http.post(environmentConfig.API + '/user/bitcoin-accounts/',{address: address}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201) {
                    $rootScope.notRegistering = true;
                    $location.path('home');
                    $scope.loadingEtheriumView = false;
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.goToNextView = function(){
            $rootScope.notRegistering = true;
            $location.path('/home');
        };
    }
})();
