(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierRequirements')
        .directive('tierRequirementsForm', tierRequirementsForm);

    /** @ngInject */
    function tierRequirementsForm() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/tierRequirements/tierRequirementsForm/tierRequirementsForm.html'
        };
    }
})();
