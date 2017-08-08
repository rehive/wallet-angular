(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .directive('transactionFilters', transactionFilters);

    /** @ngInject */
    function transactionFilters() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/filters/filters.html'
        };
    }
})();