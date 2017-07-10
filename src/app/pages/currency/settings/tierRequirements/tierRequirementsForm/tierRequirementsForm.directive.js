(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('tierRequirementsForm', tierRequirementsForm);

    /** @ngInject */
    function tierRequirementsForm() {
        return {
            restrict: 'E',
            controller: 'TierRequirementsCtrl',
            templateUrl: 'app/pages/currency/settings/tierRequirements/tierRequirementsForm/tierRequirementsForm.html'
        };
    }
})();