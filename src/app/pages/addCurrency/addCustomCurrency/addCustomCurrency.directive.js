(function () {
    'use strict';

    angular.module('BlurAdmin.pages.addCurrency')
        .directive('addCustomCurrency', addCustomCurrency);

    /** @ngInject */
    function addCustomCurrency() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/addCurrency/addCustomCurrency/addCustomCurrency.html'
        };
    }
})();