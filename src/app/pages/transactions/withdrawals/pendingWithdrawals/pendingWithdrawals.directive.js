
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('pendingWithdrawals', pendingWithdrawals);

    /** @ngInject */
    function pendingWithdrawals() {
        return {
            restrict: 'E',
            controller: 'PendingWithdrawalCtrl',
            templateUrl: 'app/pages/transactions/withdrawals/pendingWithdrawals/pendingWithdrawals.html'
        };
    }
})();