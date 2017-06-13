(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .directive('confirmDebit', confirmDebit);

    /** @ngInject */
    function confirmDebit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/debit/confirmDebit/confirmDebit.html'
        };
    }
})();
