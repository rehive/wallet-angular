(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('fees', fees);

    /** @ngInject */
    function fees() {
        return {
            restrict: 'E',
            controller: 'FeesCtrl',
            templateUrl: 'app/pages/transactions/settings/fees/fees.html'
        };
    }
})();