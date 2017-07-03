(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('currencySettingsMenu', currencySettingsMenu);

    /** @ngInject */
    function currencySettingsMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/settingsMenu/settingsMenu.html'
        };
    }
})();
