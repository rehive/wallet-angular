(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('stellarService', {
                url: '/services/stellar',
                templateUrl: 'app/pages/services/stellarService/stellarService.html',
                controller: "StellarServiceCtrl",
                title: 'Stellar Service'
            });
    }

})();
