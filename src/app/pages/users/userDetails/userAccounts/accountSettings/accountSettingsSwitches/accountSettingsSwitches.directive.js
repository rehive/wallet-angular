(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountSettingsSwitches', accountSettingsSwitches);

    /** @ngInject */
    function accountSettingsSwitches() {
        return {
            restrict: 'E',
            controller: 'AccountSettingsSwitchesCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettingsSwitches/accountSettingsSwitches.html'
        };
    }
})();
