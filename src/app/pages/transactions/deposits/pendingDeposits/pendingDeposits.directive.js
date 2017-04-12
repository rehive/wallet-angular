
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .directive('pendingDeposits', pendingDeposits);

    /** @ngInject */
    function pendingDeposits() {
        return {
            restrict: 'E',
            controller: 'PendingDepositCtrl',
            templateUrl: 'app/pages/transactions/deposits/pendingDeposits/pendingDeposits.html'
        };
    }
})();
