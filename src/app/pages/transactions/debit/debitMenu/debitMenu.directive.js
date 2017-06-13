
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .directive('debitMenu', debitMenu);

    /** @ngInject */
    function debitMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/debit/debitMenu/debitMenu.html'
        };
    }
})();
