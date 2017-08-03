(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
        .directive('confirmCurrency', confirmCurrency);

    /** @ngInject */
    function confirmCurrency() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/addCurrency/confirmCurrency/confirmCurrency.html'
        };
    }
})();