(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.overview')
        .directive('overviewContentTop', overviewContentTop);

    /** @ngInject */
    function overviewContentTop() {
        return {
            restrict: 'E',
            controller: 'OverviewContentTopCtrl',
            templateUrl: 'app/pages/transactions/overview/overviewContentTop/overviewContentTop.html'
        };
    }
})();