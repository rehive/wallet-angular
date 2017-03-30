(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency')
        .directive('confirmCurrency', confirmCurrency);

    /** @ngInject */
    function confirmCurrency() {
        return {
            restrict: 'E',
            controller: 'AddCurrencyCtrl',
            templateUrl: 'app/pages/addCurrency/confirmCurrency/confirmCurrency.html'
        };
    }
})();