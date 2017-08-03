(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
        .directive('completeCurrency', completeCurrency);

    /** @ngInject */
    function completeCurrency() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/addCurrency/completeCurrency/completeCurrency.html'
        };
    }
})();