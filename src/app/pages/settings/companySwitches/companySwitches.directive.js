(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('companySwitches', companySwitches);

    /** @ngInject */
    function companySwitches() {
        return {
            restrict: 'E',
            controller: 'CompanySwitchesCtrl',
            templateUrl: 'app/pages/settings/companySwitches/companySwitches.html'
        };
    }
})();
