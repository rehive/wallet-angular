(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('transactionsControls', transactionsControls);

    /** @ngInject */
    function transactionsControls() {
        return {
            restrict: 'E',
            controller: 'TransactionsControlsCtrl',
            templateUrl: 'app/pages/transactions/settings/transactionsControls/transactionsControls.html'
        };
    }
})();