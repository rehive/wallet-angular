(function () {
    'use strict';

    angular.module('BlurAdmin.pages')
        .directive('initialAddCurrency', initialAddCurrency);

    /** @ngInject */
    function initialAddCurrency() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/initialAddCurrency/initialAddCurrency.html'
        };
    }
})();