(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .directive('stellarServiceSettingsMenu', stellarServiceSettingsMenu);

    /** @ngInject */
    function stellarServiceSettingsMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/stellarService/stellarServiceSettings/stellarServiceSettingsMenu/stellarServiceSettingsMenu.html'
        };
    }
})();
