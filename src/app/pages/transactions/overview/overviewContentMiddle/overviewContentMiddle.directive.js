(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.overview')
        .directive('overviewContentMiddle', overviewContentMiddle);

    /** @ngInject */
    function overviewContentMiddle() {
        return {
            restrict: 'E',
            controller: 'OverviewContentMiddleCtrl',
            templateUrl: 'app/pages/transactions/overview/overviewContentMiddle/overviewContentMiddle.html'
        };
    }
})();