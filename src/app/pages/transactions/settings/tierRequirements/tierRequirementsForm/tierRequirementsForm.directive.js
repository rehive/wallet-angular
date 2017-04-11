(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('tierRequirementsForm', tierRequirementsForm);

    /** @ngInject */
    function tierRequirementsForm() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/settings/tierRequirements/tierRequirementsForm/tierRequirementsForm.html'
        };
    }
})();