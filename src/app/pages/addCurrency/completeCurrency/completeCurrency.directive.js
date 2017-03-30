(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency')
        .directive('completeCurrency', completeCurrency);

    /** @ngInject */
    function completeCurrency() {
        return {
            restrict: 'E',
            controller: 'AddCurrencyCtrl',
            templateUrl: 'app/pages/addCurrency/completeCurrency/completeCurrency.html'
        };
    }
})();