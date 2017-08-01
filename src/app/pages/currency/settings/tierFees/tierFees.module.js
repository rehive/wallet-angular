(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierFees', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('currency.settings.tierFees', {
                url: '/tier/fees',
                views:{
                    'currencySettings':{
                      templateUrl: 'app/pages/currency/settings/tierFees/tierFees.html',
                      controller: "TierFeesCtrl"
                    }
                },
                title: 'Tier fees'
            });
    }

})();
