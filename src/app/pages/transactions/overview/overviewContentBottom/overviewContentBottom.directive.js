(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.overview')
        .directive('overviewContentBottom', overviewContentBottom);

    /** @ngInject */
    function overviewContentBottom() {
        return {
            restrict: 'E',
            controller: 'OverviewContentBottomCtrl',
            templateUrl: 'app/pages/transactions/overview/overviewContentBottom/overviewContentBottom.html'
        };
    }
})();