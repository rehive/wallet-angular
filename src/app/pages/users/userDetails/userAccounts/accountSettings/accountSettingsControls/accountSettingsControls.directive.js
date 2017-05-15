(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountSettingsControls', accountSettingsControls);

    /** @ngInject */
    function accountSettingsControls() {
        return {
            restrict: 'E',
            controller: 'AccountSettingsControlsCtrl',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettingsControls/accountSettingsControls.html'
        };
    }
})();
