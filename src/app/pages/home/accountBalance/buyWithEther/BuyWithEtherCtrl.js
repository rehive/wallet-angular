(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('BuyWithEtherCtrl', BuyWithEtherCtrl);

    /** @ngInject */
    function BuyWithEtherCtrl($rootScope,$scope,$location,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.makingEtherPayment = false;

        $scope.toggleBuyBitcoinView = function () {
            $scope.makingEtherPayment = !$scope.makingEtherPayment;
        }
    }

})();