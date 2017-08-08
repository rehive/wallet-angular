(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('homeCurrencies', homeCurrencies);

    /** @ngInject */
    function homeCurrencies() {
        return {
            restrict: 'E',
            controller: 'CurrenciesCtrl',
            templateUrl: 'app/pages/home/currencies/currencies.html'
        };
    }
})();