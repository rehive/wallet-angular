(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('editCompanySwitch', editCompanySwitch);

    /** @ngInject */
    function editCompanySwitch() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/companySwitches/editCompanySwitch/editCompanySwitch.html'
        };
    }
})();
