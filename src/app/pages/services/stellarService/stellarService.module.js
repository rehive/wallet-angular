(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService', [
      "BlurAdmin.pages.services.stellarService.stellarServiceTransactions",
      "BlurAdmin.pages.services.stellarService.stellarServiceUsers",
      "BlurAdmin.pages.services.stellarService.stellarServiceSettings",
      "BlurAdmin.pages.services.stellarService.stellarServiceSetup"
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('stellarService', {
                url: '/services/stellar',
                abstract:true,
                // templateUrl: 'app/pages/services/stellarService/stellarService.html',
                // controller: "StellarServiceCtrl",
                title: 'Stellar service'
            });
            $urlRouterProvider.when("/services/stellar", "/services/stellar/setup");
    }

})();
