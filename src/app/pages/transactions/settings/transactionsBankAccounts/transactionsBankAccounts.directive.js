(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('transactionsBankAccounts', transactionsBankAccounts);

    /** @ngInject */
    function transactionsBankAccounts() {
        return {
            restrict: 'E',
            controller: 'TransactionsBankAccountsCtrl',
            templateUrl: 'app/pages/transactions/settings/transactionsBankAccounts/transactionsBankAccounts.html'
        };
    }
})();