(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountSettingsAllowedLimits', accountSettingsAllowedLimits);

    /** @ngInject */
    function accountSettingsAllowedLimits() {
        return {
            restrict: 'E',
            controller: 'AccountSettingsAllowedLimitsCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettingsAllowedLimits/accountSettingsAllowedLimits.html'
        };
    }
})();
