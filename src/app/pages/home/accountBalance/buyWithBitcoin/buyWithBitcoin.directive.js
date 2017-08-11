(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('buyWithBitcoin', buyWithBitcoin);

    /** @ngInject */
    function buyWithBitcoin() {
        return {
            restrict: 'E',
            controller: 'BuyWithBitcoinCtrl',
            templateUrl: 'app/pages/home/accountBalance/buyWithBitcoin/buyWithBitcoin.html'
        };
    }
})();