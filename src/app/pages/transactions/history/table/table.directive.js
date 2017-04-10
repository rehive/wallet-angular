(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .directive('historyTable', historyTable);

    /** @ngInject */
    function historyTable() {
        return {
            restrict: 'E',
            controller: 'HistoryCtrl',
            templateUrl: 'app/pages/transactions/history/table/table.html'
        };
    }
})();