(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tiers', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.tiers', {
                url: '/tiers',
                templateUrl: 'app/pages/currency/settings/tiers/tiers.html',
                controller: "TiersCtrl",
                title: 'Tiers'
            });
    }

})();
