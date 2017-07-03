(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('tierRequirements', tierRequirements);

    /** @ngInject */
    function tierRequirements() {
        return {
            restrict: 'E',
            controller: 'TierRequirementsCtrl',
            templateUrl: 'app/pages/currency/settings/tierRequirements/tierRequirements.html'
        };
    }
})();