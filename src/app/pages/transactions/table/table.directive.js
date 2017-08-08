(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions')
        .directive('transactionsTable', transactionsTable);

    /** @ngInject */
    function transactionsTable() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/table/table.html'
        };
    }
})();