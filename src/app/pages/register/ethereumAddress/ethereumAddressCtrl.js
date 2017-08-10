(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ethereumAddress')
        .controller('EthereumAddressCtrl', EthereumAddressCtrl);

    /** @ngInject */
    function EthereumAddressCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
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
                    $scope.loadingEtheriumView = false;
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        $scope.addEthereumAddress = function(){
            $location.path('home');
        };

        $scope.goToNextView = function(){
            $rootScope.notRegistering = true;
            $location.path('/home');
        };
    }
})();
