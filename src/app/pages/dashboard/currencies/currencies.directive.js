(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('dashboardCurrencies', dashboardCurrencies);

    /** @ngInject */
    function dashboardCurrencies() {
        return {
            restrict: 'E',
            controller: 'CurrenciesCtrl',
            templateUrl: 'app/pages/dashboard/currencies/currencies.html'
        };
    }
})();