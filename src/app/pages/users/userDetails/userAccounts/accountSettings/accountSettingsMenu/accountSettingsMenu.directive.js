(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .directive('accountSettingsMenu', accountSettingsMenu);

    /** @ngInject */
    function accountSettingsMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/users/userDetails/userAccounts/accountSettings/accountSettingsMenu/accountSettingsMenu.html'
        };
    }
})();
