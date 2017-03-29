(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('completeWithdrawal', completeWithdrawal);

    /** @ngInject */
    function completeWithdrawal() {
        return {
            restrict: 'E',
            controller: 'WithdrawalsCtrl',
            templateUrl: 'app/pages/transactions/withdrawals/completeWithdrawal/completeWithdrawal.html'
        };
    }
})();