(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountSettingsCustomLimits', accountSettingsCustomLimits);

    /** @ngInject */
    function accountSettingsCustomLimits() {
        return {
            restrict: 'E',
            controller: 'AccountSettingsCustomLimitsCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettingsCustomLimits/accountSettingsCustomLimits.html'
        };
    }
})();
