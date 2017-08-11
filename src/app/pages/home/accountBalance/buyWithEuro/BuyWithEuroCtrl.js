(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('BuyWithEuroCtrl', BuyWithEuroCtrl);

    /** @ngInject */
    function BuyWithEuroCtrl($rootScope,$scope,$location,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.makingPayment = false;

        $scope.toggleBuyEuroView = function () {
            $scope.makingPayment = !$scope.makingPayment;
        }
    }

})();