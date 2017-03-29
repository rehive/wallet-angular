(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('createWithdrawal', createWithdrawal);

    /** @ngInject */
    function createWithdrawal() {
        return {
            restrict: 'E',
            controller: 'WithdrawalsCtrl',
            templateUrl: 'app/pages/transactions/withdrawals/createWithdrawal/createWithdrawal.html'
        };
    }
})();