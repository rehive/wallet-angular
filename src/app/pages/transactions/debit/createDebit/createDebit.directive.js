(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .directive('createDebit', createDebit);

    /** @ngInject */
    function createDebit() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/debit/createDebit/createDebit.html'
        };
    }
})();
