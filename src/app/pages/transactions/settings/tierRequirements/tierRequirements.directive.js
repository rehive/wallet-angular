(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('tierRequirements', tierRequirements);

    /** @ngInject */
    function tierRequirements() {
        return {
            restrict: 'E',
            controller: 'TierRequirementsCtrl',
            templateUrl: 'app/pages/transactions/settings/tierRequirements/tierRequirements.html'
        };
    }
})();