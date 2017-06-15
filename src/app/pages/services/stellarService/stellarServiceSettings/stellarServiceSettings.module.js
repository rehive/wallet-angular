(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('stellarServiceSettings', {
                url: '/services/stellar/settings',
                templateUrl: 'app/pages/services/stellarService/stellarServiceSettings/stellarServiceSettings.html',
                controller: "StellarServiceSettingsCtrl",
                title: 'Settings'
            });
    }

})();
