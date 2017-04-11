(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('tierLimitsForm', tierLimitsForm);

    /** @ngInject */
    function tierLimitsForm() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/settings/tierLimits/tierLimitsForm/tierLimitsForm.html'
        };
    }
})();