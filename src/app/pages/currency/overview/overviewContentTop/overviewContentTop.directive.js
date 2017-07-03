(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.overview')
        .directive('overviewContentTop', overviewContentTop);

    /** @ngInject */
    function overviewContentTop() {
        return {
            restrict: 'E',
            controller: 'OverviewContentTopCtrl',
            templateUrl: 'app/pages/currency/overview/overviewContentTop/overviewContentTop.html'
        };
    }
})();