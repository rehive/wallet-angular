(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.bitcoinAddresses', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.bitcoinAddresses', {
                url: '/bitcoin-addresses',
                views: {
                  'generalSettings': {
                      controller: 'BitcoinAddressesCtrl',
                      templateUrl: 'app/pages/settings/bitcoinAddresses/bitcoinAddresses.html'
                  }
                },
                title: "Bitcoin Addresses"
            });
    }

})();
