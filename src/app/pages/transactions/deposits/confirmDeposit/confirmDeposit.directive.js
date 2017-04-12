
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .directive('confirmDeposit', confirmDeposit);

    /** @ngInject */
    function confirmDeposit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/deposits/confirmDeposit/confirmDeposit.html'
        };
    }
})();
