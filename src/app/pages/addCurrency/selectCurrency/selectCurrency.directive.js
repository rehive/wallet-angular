(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency')
        .directive('selectCurrency', selectCurrency);

    /** @ngInject */
    function selectCurrency() {
        return {
            restrict: 'E',
            controller: 'AddCurrencyCtrl',
            templateUrl: 'app/pages/addCurrency/selectCurrency/selectCurrency.html'
        };
    }
})();