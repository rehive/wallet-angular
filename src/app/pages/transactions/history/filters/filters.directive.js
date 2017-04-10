(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .directive('historyFilters', historyFilters);

    /** @ngInject */
    function historyFilters() {
        return {
            restrict: 'E',
            controller: 'HistoryCtrl',
            templateUrl: 'app/pages/transactions/history/filters/filters.html'
        };
    }
})();