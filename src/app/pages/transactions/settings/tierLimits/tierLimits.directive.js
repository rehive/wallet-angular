(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('tierLimits', tierLimits);

    /** @ngInject */
    function tierLimits() {
        return {
            restrict: 'E',
            controller: 'TierLimitsCtrl',
            templateUrl: 'app/pages/transactions/settings/tierLimits/tierLimits.html'
        };
    }
})();