(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('createWithdrawal', createWithdrawal);

    /** @ngInject */
    function createWithdrawal() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/withdrawals/createWithdrawal/createWithdrawal.html'
        };
    }
})();
