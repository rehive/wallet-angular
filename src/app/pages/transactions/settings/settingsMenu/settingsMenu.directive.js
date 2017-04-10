(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('transactionsSettingsMenu', transactionsSettingsMenu);

    /** @ngInject */
    function transactionsSettingsMenu() {
        return {
            restrict: 'E',
            controller: 'SettingsCtrl',
            templateUrl: 'app/pages/transactions/settings/settingsMenu/settingsMenu.html'
        };
    }
})();