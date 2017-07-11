(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierLimits')
        .directive('editTierLimits', editTierLimits);

    /** @ngInject */
    function editTierLimits() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/tierLimits/editTierLimits/editTierLimits.html'
        };
    }
})();
