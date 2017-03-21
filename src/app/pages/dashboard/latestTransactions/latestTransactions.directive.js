(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .directive('latestTransactions', latestTransactions);

    /** @ngInject */
    function latestTransactions() {
        return {
            restrict: 'E',
            controller: 'LatestTransactionsCtrl',
            templateUrl: 'app/pages/dashboard/latestTransactions/latestTransactions.html'
        };
    }
})();