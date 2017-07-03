(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('tierLimits', tierLimits);

    /** @ngInject */
    function tierLimits() {
        return {
            restrict: 'E',
            controller: 'TierLimitsCtrl',
            templateUrl: 'app/pages/currency/settings/tierLimits/tierLimits.html'
        };
    }
})();