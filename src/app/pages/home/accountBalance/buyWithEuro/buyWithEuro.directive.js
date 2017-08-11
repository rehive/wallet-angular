(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('buyWithEuro', buyWithEuro);

    /** @ngInject */
    function buyWithEuro() {
        return {
            restrict: 'E',
            controller: 'BuyWithEuroCtrl',
            templateUrl: 'app/pages/home/accountBalance/buyWithEuro/buyWithEuro.html'
        };
    }
})();