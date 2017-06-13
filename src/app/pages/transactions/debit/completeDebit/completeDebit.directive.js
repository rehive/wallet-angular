(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .directive('completeDebit', completeDebit);

    /** @ngInject */
    function completeDebit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/debit/completeDebit/completeDebit.html'
        };
    }
})();
