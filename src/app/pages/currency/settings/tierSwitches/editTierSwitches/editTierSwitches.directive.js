(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierSwitches')
        .directive('editTierSwitches', editTierSwitches);

    /** @ngInject */
    function editTierSwitches() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/tierSwitches/editTierSwitches/editTierSwitches.html'
        };
    }
})();