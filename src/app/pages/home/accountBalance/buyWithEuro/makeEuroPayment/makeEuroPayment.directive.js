(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('makeEuroPayment', makeEuroPayment);

    /** @ngInject */
    function makeEuroPayment() {
        return {
            restrict: 'E',
            require: 'parent',
            templateUrl: 'app/pages/home/accountBalance/buyWithEuro/makeEuroPayment/makeEuroPayment.html'
        };
    }
})();