(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
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