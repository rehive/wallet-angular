(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('tierLimitsForm', tierLimitsForm);

    /** @ngInject */
    function tierLimitsForm() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/tierLimits/tierLimitsForm/tierLimitsForm.html'
        };
    }
})();