(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('BuyWithBitcoinCtrl', BuyWithBitcoinCtrl);

    /** @ngInject */
    function BuyWithBitcoinCtrl($rootScope,$scope,$location,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.makingBitcoinPayment = false;

        $scope.toggleBuyBitcoinView = function () {
            $scope.makingBitcoinPayment = !$scope.makingBitcoinPayment;
        }


    }
})();