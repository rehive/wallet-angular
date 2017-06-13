
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.credit')
        .directive('pendingCredit', pendingCredit);

    /** @ngInject */
    function pendingCredit() {
        return {
            restrict: 'E',
            controller: 'PendingCreditCtrl',
            templateUrl: 'app/pages/transactions/credit/pendingCredit/pendingCredit.html'
        };
    }
})();
