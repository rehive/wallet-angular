(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('latestTransactions', latestTransactions);

    /** @ngInject */
    function latestTransactions() {
        return {
            restrict: 'E',
            controller: 'LatestTransactionsCtrl',
            templateUrl: 'app/pages/home/latestTransactions/latestTransactions.html'
        };
    }
})();