(function () {
    'use strict';

    angular.module('BlurAdmin.bitcoinService', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('bitcoinService', {
                url: '/bitcoinService',
                templateUrl: 'app/pages/services/bitcoinService/bitcoinService.html',
                controller: "BitcoinServiceCtrl",
                title: 'Bitcoin Service'
            });
    }

})();