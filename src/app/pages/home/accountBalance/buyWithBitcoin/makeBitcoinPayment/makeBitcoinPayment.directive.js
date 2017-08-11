(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('makeBitcoinPayment', makeBitcoinPayment);

    /** @ngInject */
    function makeBitcoinPayment() {
        return {
            restrict: 'E',
            require: 'parent',
            templateUrl: 'app/pages/home/accountBalance/buyWithBitcoin/makeBitcoinPayment/makeBitcoinPayment.html'
        };
    }
})();