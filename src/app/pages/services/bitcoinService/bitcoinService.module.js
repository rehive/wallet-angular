(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService', [
      "BlurAdmin.pages.services.bitcoinService.bitcoinServiceTransactions",
      "BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers",
      "BlurAdmin.pages.services.bitcoinService.bitcoinServiceSettings",
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('bitcoinService', {
                url: '/services/bitcoin',
                abstract:true,
                // templateUrl: 'app/pages/services/bitcoinService/bitcoinService.html',
                // controller: "BitcoinServiceCtrl",
                title: 'Bitcoin service'
            });
            $urlRouterProvider.when("/services/bitcoin", "/services/bitcoin/transactions");
    }

})();
