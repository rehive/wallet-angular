(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.overview')
        .directive('overviewContentMiddle', overviewContentMiddle);

    /** @ngInject */
    function overviewContentMiddle() {
        return {
            restrict: 'E',
            controller: 'OverviewContentMiddleCtrl',
            templateUrl: 'app/pages/currency/overview/overviewContentMiddle/overviewContentMiddle.html'
        };
    }
})();