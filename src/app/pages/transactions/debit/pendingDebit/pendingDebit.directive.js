
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .directive('pendingDebit', pendingDebit);

    /** @ngInject */
    function pendingDebit() {
        return {
            restrict: 'E',
            controller: 'PendingDebitCtrl',
            templateUrl: 'app/pages/transactions/debit/pendingDebit/pendingDebit.html'
        };
    }
})();