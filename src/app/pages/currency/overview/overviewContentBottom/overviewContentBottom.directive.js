(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.overview')
        .directive('overviewContentBottom', overviewContentBottom);

    /** @ngInject */
    function overviewContentBottom() {
        return {
            restrict: 'E',
            controller: 'OverviewContentBottomCtrl',
            templateUrl: 'app/pages/currency/overview/overviewContentBottom/overviewContentBottom.html'
        };
    }
})();