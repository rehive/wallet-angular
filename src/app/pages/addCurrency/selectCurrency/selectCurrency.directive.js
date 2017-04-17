(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
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