(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceSettings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('bitcoinServiceSettings', {
                url: '/bitcoinServiceSettings',
                templateUrl: 'app/pages/services/bitcoinService/bitcoinServiceSettings/bitcoinServiceSettings.html',
                controller: "BitcoinServiceSettingsCtrl",
                title: 'Settings'
            });
    }

})();
